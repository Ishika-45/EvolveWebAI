class AIServiceGateway {
constructor({ aiClient, logger = console }) {
this.aiClient = aiClient;
this.logger = logger;
}

async generate({
models = [],
prompt,
responseType = "text",
temperature = 0.7,
maxTokens = 2000,
systemPrompt = "You are an expert AI assistant.",
}) {
if (!models.length) {
throw new Error("No AI models configured.");
}

let lastError = null;

for (const model of models) {
  // First attempt
  try {
    const result = await this.#attempt({
      model,
      prompt,
      responseType,
      temperature,
      maxTokens,
      systemPrompt,
    });

    this.logger.info(`✅ Model succeeded: ${model}`);

    return {
      model,
      data: result,
    };
  } catch (error) {
    lastError = error;

    this.logger.warn(`⚠️ First attempt failed: ${model}`);
    this.logger.warn(error.message);

    // Retry once before moving to another model
    if (responseType === "json") {
      try {
        this.logger.info(`🔄 Retrying JSON generation: ${model}`);

        const retryPrompt = `


${prompt}

IMPORTANT:
Return the COMPLETE response as valid JSON.
Do not truncate the response.
Do not add markdown.
Do not wrap the JSON in code fences.
Make sure every string is fully closed and every object/array is properly closed.
Return ONLY the JSON object.
`;

        const result = await this.#attempt({
          model,
          prompt: retryPrompt,
          responseType,
          temperature: 0.2,
          maxTokens,
          systemPrompt,
        });

        this.logger.info(`✅ Retry succeeded: ${model}`);

        return {
          model,
          data: result,
        };
      } catch (retryError) {
        lastError = retryError;

        this.logger.warn(`❌ Retry failed: ${model}`);
        this.logger.warn(retryError.message);
      }
    }
  }
}

throw new Error(
  `All configured AI models failed.\nLast Error: ${lastError?.message}`
);


}

async #attempt({
model,
prompt,
responseType,
temperature,
maxTokens,
systemPrompt,
}) {
this.logger.info(`🤖 Trying model: ${model}`);


const request = {
  model,
  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature,
  max_tokens: maxTokens,
};

// Ask compatible models to return JSON directly.
if (responseType === "json") {
  request.response_format = {
    type: "json_object",
  };
}

const response = await this.aiClient(request);

if (!response) {
  throw new Error("AI provider returned an empty response.");
}

const cleaned = this.#clean(response);

if (!cleaned) {
  throw new Error("AI provider returned empty content.");
}

if (responseType === "json") {
  return this.#parseJson(cleaned);
}

return cleaned;


}

#clean(text) {
if (!text) return "";

return String(text)
  .replace(/```json/gi, "")
  .replace(/```html/gi, "")
  .replace(/```/g, "")
  .trim();


}

#parseJson(text) {
try {
return JSON.parse(text);
} catch (error) {
  // Some models (especially reasoning models the random free router can
  // select) wrap the JSON in commentary or chain-of-thought text instead
  // of returning it alone, even when explicitly asked not to. As a
  // recovery step, try to extract the outermost {...} block and parse
  // that before giving up entirely.
  const extracted = this.#extractJsonBlock(text);

  if (extracted) {
    try {
      return JSON.parse(extracted);
    } catch (secondError) {
      // fall through to the original error below
    }
  }

  console.error("\n========== INVALID AI JSON ==========");
  console.error(text);
  console.error("=====================================\n");

  throw new Error(
    `AI returned invalid JSON.\nParse error: ${error.message}`
  );
}

}

#extractJsonBlock(text) {
const start = text.indexOf("{");
const end = text.lastIndexOf("}");

if (start === -1 || end === -1 || end <= start) {
  return null;
}

return text.slice(start, end + 1);
}
}

module.exports = AIServiceGateway;