const BaseAgent = require("../core/BaseAgent");

const {
  buildWebsiteContentPrompt,
} = require("./buildWebsiteContentPrompt");

const {
  validateWebsiteContent,
} = require("./validateWebsiteContent");

const agentConfigs = require("../config/agentConfigs");

class WebsiteContentAgent extends BaseAgent {
  static dependencies = [
    "websitePlanner",
    "websiteStructure",
    "websiteTheme",
    "websiteSections",
    "marketing",
    "branding",
  ];

  constructor({ gateway }) {
    super("WebsiteContentAgent");

    this.gateway = gateway;
    this.config = agentConfigs.websiteContent;
  }

  async run(context) {
    const prompt = buildWebsiteContentPrompt(context);

    const result = await this.gateway.generate({
      models: this.config.models,
      prompt,
      responseType: this.config.responseType,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      systemPrompt: this.config.systemPrompt,
    });

    context.setModel(result.model);

    const validated = validateWebsiteContent(
      result.data,
      context.websiteSections
    );

    context.updateWebsiteContent(validated);

    return validated;
  }
}

module.exports = WebsiteContentAgent;