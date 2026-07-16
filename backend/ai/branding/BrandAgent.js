const BaseAgent = require("../core/BaseAgent");

const {
  buildBrandingPrompt,
} = require("./buildBrandingPrompt");

const validateBranding = require("./validateBranding");

class BrandAgent extends BaseAgent {
  constructor({ gateway }) {
    super("BrandAgent");

    this.gateway = gateway;
  }

  async run(context) {
    const prompt = buildBrandingPrompt(context);

    const branding = await this.gateway.generate({
      prompt,
      responseType: "json",
      temperature: 0.7,
      maxTokens: 1500,
    });

    const validated = validateBranding(branding);

    context.updateBranding(validated);

    return validated;
  }
}

module.exports = BrandAgent;