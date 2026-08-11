const BaseAgent = require("../core/BaseAgent");

const {
  buildWebsiteStructurePrompt,
} = require("./buildWebsiteStructurePrompt");

const {
  validateWebsiteStructure,
} = require("./validateWebsiteStructure");

const agentConfigs = require("../config/agentConfigs");

class WebsiteStructureAgent extends BaseAgent {

  static dependencies = [
    "websitePlanner",
  ];

  constructor({ gateway }) {
    super("WebsiteStructureAgent");

    this.gateway = gateway;
    this.config = agentConfigs.websiteStructure;
  }

  async run(context) {

    const prompt = buildWebsiteStructurePrompt(context);

    const result = await this.gateway.generate({
      models: this.config.models,
      prompt,
      responseType: this.config.responseType,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      systemPrompt: this.config.systemPrompt,
    });

    context.setModel(result.model);

    const validated = validateWebsiteStructure(result.data);

    context.updateWebsite({
      structure: validated,
    });

    return validated;
  }
}

module.exports = WebsiteStructureAgent;