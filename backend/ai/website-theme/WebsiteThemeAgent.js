const BaseAgent = require("../core/BaseAgent");

const {
  buildThemePrompt,
} = require("./buildThemePrompt");

const {
  validateTheme,
} = require("./validateTheme");

const agentConfigs = require("../config/agentConfigs");

class WebsiteThemeAgent extends BaseAgent {
  static dependencies = [
    "analysis",
    "branding",
    "assets",
    "websitePlanner",
  ];

  constructor({ gateway }) {
    super("WebsiteThemeAgent");

    this.gateway = gateway;

    this.config = agentConfigs.websiteTheme;
  }

  async run(context) {
    const prompt = buildThemePrompt(context);

    const result = await this.gateway.generate({
      models: this.config.models,
      prompt,
      responseType: this.config.responseType,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      systemPrompt: this.config.systemPrompt,
    });

    context.setModel(result.model);

    const validated = validateTheme(result.data);

    context.updateWebsiteTheme(validated);

    return validated;
  }
}

module.exports = WebsiteThemeAgent;