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

        this.logger.info(`✅ Model succeeded: ${model}`);

        return {
          model,
          data: result,
        };
      } catch (error) {
        lastError = error;

        this.logger.warn(`⚠️ Model failed: ${model}`);
        this.logger.warn(error.message);

        if (error.status) {
          this.logger.warn(`Provider status: ${error.status}`);
        }

        if (error.code) {
          this.logger.warn(`Provider code: ${error.code}`);
        }

        // Move to the next configured model.
        // Do NOT immediately retry the same model.
      }
    }

    const errorMessage = lastError?.message || "Unknown AI provider error.";

    throw new Error(
      `All configured AI models failed.\nLast Error: ${errorMessage}`
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
      this.logger.error("\n========== INVALID AI JSON ==========");
      this.logger.error(text);
      this.logger.error("=====================================\n");

      throw new Error(
        `AI returned invalid JSON.\nParse error: ${error.message}`
      );
    }
  }
}

module.exports = AIServiceGateway;