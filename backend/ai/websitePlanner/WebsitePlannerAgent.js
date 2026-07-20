const BaseAgent = require("../core/BaseAgent");

const {
  buildWebsitePlannerPrompt,
} = require("./buildWebsitePlannerPrompt");

const {
  validateWebsitePlanner,
} = require("./validateWebsitePlanner");

const agentConfigs = require("../config/agentConfigs");

class WebsitePlannerAgent extends BaseAgent {

  static dependencies = [
    "analysis",
    "branding",
    "assets",
    "marketing",
  ];

  constructor({ gateway }) {
    super("WebsitePlannerAgent");

    this.gateway = gateway;

    this.config = agentConfigs.websitePlanner;
  }

  async run(context) {

    const prompt = buildWebsitePlannerPrompt(context);

    const result = await this.gateway.generate({

      models: this.config.models,

      prompt,

      responseType: this.config.responseType,

      temperature: this.config.temperature,

      maxTokens: this.config.maxTokens,

      systemPrompt: this.config.systemPrompt,

    });

    context.setModel(result.model);

    const validated = validateWebsitePlanner(result.data);

    context.updateWebsite(validated);

    return validated;
  }
}

module.exports = WebsitePlannerAgent;