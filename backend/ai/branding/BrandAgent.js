const BaseAgent = require("../core/BaseAgent");

const {
  buildBrandingPrompt,
} = require("./buildBrandingPrompt");

const {
  validateBranding,
} = require("./validateBranding");

const agentConfigs = require("../config/agentConfigs");

class BrandAgent extends BaseAgent {
  static dependencies = [
    "analysis",
  ];
  constructor({ gateway }) {
    super("BrandAgent");

    this.gateway = gateway;

    this.config = agentConfigs.branding;
  }

  async run(context) {
    const prompt = buildBrandingPrompt(context);

    const branding = await this.gateway.generate({
      models: this.config.models,

      prompt,

      responseType: this.config.responseType,

      temperature: this.config.temperature,

      maxTokens: this.config.maxTokens,

      systemPrompt: this.config.systemPrompt,
    });

    const validated = validateBranding(branding);

    context.updateBranding(validated);

    return validated;
  }
}

module.exports = BrandAgent;