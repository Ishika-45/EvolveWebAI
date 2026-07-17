const BaseAgent = require("../core/BaseAgent");

const {
  buildAssetsPrompt,
} = require("./buildAssetsPrompt");

const {
  validateAssets,
} = require("./validateAssets");

const agentConfigs = require("../config/agentConfigs");

class AssetsAgent extends BaseAgent {

  constructor({ gateway }) {

    super("AssetsAgent");

    this.gateway = gateway;

    this.config = agentConfigs.assets;

  }

  async run(context) {

    const prompt = buildAssetsPrompt(context);

    const assets = await this.gateway.generate({

      models: this.config.models,

      prompt,

      responseType: this.config.responseType,

      temperature: this.config.temperature,

      maxTokens: this.config.maxTokens,

      systemPrompt: this.config.systemPrompt,

    });

    const validated = validateAssets(assets);

    context.updateAssets(validated);

    return validated;

  }

}

module.exports = AssetsAgent;