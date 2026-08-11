const BaseAgent = require("../core/BaseAgent");

const {
  buildWebsiteThemePrompt,
} = require("./buildWebsiteThemePrompt");

const {
  validateWebsiteTheme,
} = require("./validateWebsiteTheme");

const agentConfigs = require("../config/agentConfigs");

class WebsiteThemeAgent extends BaseAgent {

  static dependencies = [
    "websitePlanner",
    "websiteStructure",
  ];

  constructor({ gateway }) {
    super("WebsiteThemeAgent");

    this.gateway = gateway;
    this.config = agentConfigs.websiteTheme;
  }

  async run(context) {

    const prompt = buildWebsiteThemePrompt(context);

    const result = await this.gateway.generate({
      models: this.config.models,
      prompt,
      responseType: this.config.responseType,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      systemPrompt: this.config.systemPrompt,
    });

    context.setModel(result.model);

    const validated = validateWebsiteTheme(result.data);

   context.updateWebsiteTheme(validated);

    return validated;
  }
}

module.exports = WebsiteThemeAgent;