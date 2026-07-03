class AIServiceGateway {
  constructor({ aiClient, logger = console }) {
    this.aiClient = aiClient;
    this.logger = logger;
  }

  async generateAnalysis(prompt) {
    return this.#request(prompt, {
      temperature: 0.6,
      max_tokens: 1200,
      responseType: "json",
    });
  }

  async generateBrand(prompt) {
    return this.#request(prompt, {
      temperature: 0.8,
      max_tokens: 1200,
      responseType: "json",
    });
  }

  async generateWebsite(prompt) {
    return this.#request(prompt, {
      temperature: 0.4,
      max_tokens: 4000,
      responseType: "text",
    });
  }

  async #request(prompt, options = {}) {
    try {
      const response = await this.aiClient(
        [
          {
            role: "system",
            content: "You are an expert AI assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        options
      );

      const cleaned = this.#clean(response);

      if (options.responseType === "json") {
        return this.#parseJson(cleaned);
      }

      return cleaned;
    } catch (error) {
      this.logger.error(error);

      throw new Error("AI request failed.");
    }
  }

  #clean(text) {
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