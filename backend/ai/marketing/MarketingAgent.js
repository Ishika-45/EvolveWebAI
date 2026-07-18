const BaseAgent = require("../core/BaseAgent");

const {
  buildMarketingPrompt,
} = require("./buildMarketingPrompt");

const {
  validateMarketing,
} = require("./validateMarketing");

const agentConfigs = require("../config/agentConfigs");

class MarketingAgent extends BaseAgent {

  constructor({ gateway }) {

    super("MarketingAgent");

    this.gateway = gateway;

    this.config = agentConfigs.marketing;

  }

  async run(context) {

    const prompt = buildMarketingPrompt(context);

    const marketing = await this.gateway.generate({

      models: this.config.models,

      prompt,

      responseType: this.config.responseType,

      temperature: this.config.temperature,

      maxTokens: this.config.maxTokens,

      systemPrompt: this.config.systemPrompt,

    });

    const validated = validateMarketing(marketing);

    context.updateMarketing(validated);

    return validated;

  }

}

module.exports = MarketingAgent;