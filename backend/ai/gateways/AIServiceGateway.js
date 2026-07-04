class AIServiceGateway {
  constructor({ aiClient, logger = console }) {
    this.aiClient = aiClient;
    this.logger = logger;
  }

  async generate({
    prompt,
    responseType = "text",
    temperature = 0.7,
    maxTokens = 2000,
    systemPrompt = "You are an expert AI assistant.",
  }) {
    try {
      const response = await this.aiClient(
        [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        {
          temperature,
          max_tokens: maxTokens,
        }
      );

      const cleaned = this.#clean(response);

      await gateway.generate({
    prompt,
    output: "json"
})

      return cleaned;
    } catch (error) {
      this.logger.error("AI Gateway Error:", error);

      throw new Error("AI generation failed.");
    }
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
      throw new Error("Invalid JSON returned by AI.");
    }
  }
}

module.exports = AIServiceGateway;