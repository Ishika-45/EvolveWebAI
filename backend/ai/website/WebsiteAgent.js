const BaseAgent = require("../core/BaseAgent");

const {
  buildWebsitePrompt,
} = require("./buildWebsitePrompt");

const {
  validateWebsite,
} = require("./validateWebsite");

const agentConfigs = require("../config/agentConfigs");

class WebsiteAgent extends BaseAgent {
  static dependencies = [
    "analysis",
    "branding",
    "assets",
    "marketing",
  ];

  constructor({ gateway }) {
    super("WebsiteAgent");

    this.gateway = gateway;
    this.config = agentConfigs.website;
  }

  async run(context) {
    const prompt = buildWebsitePrompt(context);

    const result = await this.gateway.generate({
      models: this.config.models,
      prompt,
      responseType: this.config.responseType,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      systemPrompt: this.config.systemPrompt,
    });

    context.setModel(result.model);

    const validated = validateWebsite(result.data);

    context.updateWebsite(validated);

    return validated;
  }
}

module.exports = WebsiteAgent;