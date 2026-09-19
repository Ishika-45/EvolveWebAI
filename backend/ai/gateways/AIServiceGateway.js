class AIServiceGateway {
  constructor({ aiClient, logger = console }) {
    if (typeof aiClient !== "function") {
      throw new Error("AI client must be a function.");
    }

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
    if (!Array.isArray(models) || models.length === 0) {
      throw new Error("No AI models configured.");
    }


    if (!prompt || typeof prompt !== "string") {
      throw new Error("AI prompt is required.");
    }

    let lastError = null;

    for (const model of models) {
      try {
        const result = await this.#attempt({
          model,
          prompt,
          responseType,
          temperature,
          maxTokens,
          systemPrompt,
        });

        this.logger.info(`Model succeeded: ${model}`);

        return {
          model,
          data: result,
        };
      } catch (error) {
        lastError = error;

        this.logger.warn(`Model failed: ${model}`);
        this.logger.warn(`Error: ${error.message}`);
        this.logger.warn(`Stack:\n${error.stack}`);

        if (error.status) {
          this.logger.warn(`Provider status: ${error.status}`);
        }

        if (error.code) {
          this.logger.warn(`Provider code: ${error.code}`);
        }

        if (error.type) {
          this.logger.warn(`Provider type: ${error.type}`);
        }
      }
    }

    throw new Error(
      `All configured AI models failed.\nLast Error: ${lastError?.message || "Unknown AI provider error."
      }`
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
    this.logger.info(`Trying model: ${model}`);


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

    if (responseType === "json") {
      request.response_format = {
        type: "json_object",
      };
    }

    const response = await this.aiClient(request);

    if (!response) {
      throw new Error("AI provider returned an empty response.");
    }

    const extracted = this.#extractContent(response);

    if (!extracted.content) {
      const finishReason =
        extracted.finishReason || "unknown";

      const providerError =
        extracted.error ||
        response?.error ||
        response?.message?.error ||
        null;

      const details = providerError
        ? typeof providerError === "string"
          ? providerError
          : JSON.stringify(providerError)
        : "";

      throw new Error(
        `AI provider returned no content. ` +
        `Finish reason: ${finishReason}` +
        (details ? `\nProvider error: ${details}` : "")
      );
    }

    const cleaned = this.#clean(extracted.content);

    if (!cleaned) {
      throw new Error(
        `AI provider returned empty content. ` +
        `Finish reason: ${extracted.finishReason || "unknown"}`
      );
    }

    if (responseType === "json") {
      return this.#parseJson(cleaned);
    }

    return cleaned;


  }

#extractContent(response) {
  if (typeof response === "string") {
    return {
      content: response,
      finishReason: "stop",
    };
  }

  const choice = response?.choices?.[0];

  const content =
    response?.content ??
    response?.message?.content ??
    choice?.message?.content ??
    choice?.text ??
    "";

  const finishReason =
    response?.finish_reason ??
    response?.finishReason ??
    choice?.finish_reason ??
    choice?.finishReason ??
    "unknown";

  const error =
    response?.error ??
    response?.message?.error ??
    choice?.error ??
    null;

  return {
    content,
    finishReason,
    error,
  };
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
      this.logger.error(
        "\n========== INVALID AI JSON =========="
      );


      this.logger.error(text);

      this.logger.error(
        "=====================================\n"
      );

      throw new Error(
        `AI returned invalid JSON.\nParse error: ${error.message}`
      );
    }

  }
}

module.exports = AIServiceGateway;
