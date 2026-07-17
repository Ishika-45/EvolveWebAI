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
      try {
        this.logger.info(`🤖 Trying model: ${model}`);

        const response = await this.aiClient({
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
        });

        const cleaned = this.#clean(response);

        this.logger.info(`✅ Model succeeded: ${model}`);

        if (responseType === "json") {
          return this.#parseJson(cleaned);
        }

        return cleaned;
      } catch (error) {
        lastError = error;

        this.logger.warn(`❌ ${model} failed`);

        this.logger.warn(error.message);

        continue;
      }
    }

    throw new Error(
      `All configured AI models failed.\nLast Error: ${lastError?.message}`
    );
  }

  #clean(text) {
    if (!text) return "";

    return text
      .replace(/```json/g, "")
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();
  }

  #parseJson(text) {
    try {
      return JSON.parse(text);
    } catch {
      throw new Error("AI returned invalid JSON.");
    }
  }
}

module.exports = AIServiceGateway;