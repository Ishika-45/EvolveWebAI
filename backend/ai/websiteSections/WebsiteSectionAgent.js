const BaseAgent = require("../core/BaseAgent");

const {
  buildWebsiteSectionsPrompt,
} = require("./buildWebsiteSectionsPrompt");

const {
  validateWebsiteSections,
} = require("./validateWebsiteSections");

const agentConfigs = require("../config/agentConfigs");

class WebsiteSectionAgent extends BaseAgent {
  static dependencies = [
    "websitePlanner",
    "websiteStructure",
    "marketing",
    "websiteTheme",
  ];

  constructor({ gateway }) {
    super("WebsiteSectionAgent");

    this.gateway = gateway;
    this.config = agentConfigs.websiteSections;
  }

  async run(context) {
    const prompt = buildWebsiteSectionsPrompt(context);

    const result = await this.gateway.generate({
      models: this.config.models,
      prompt,
      responseType: this.config.responseType,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      systemPrompt: this.config.systemPrompt,
    });

    context.setModel(result.model);

    const validated = validateWebsiteSections(
  result.data,
  context.website?.structure
);

    context.updateWebsiteSections(validated);

    return validated;
  }
}

module.exports = WebsiteSectionAgent;

