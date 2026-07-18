const BaseAgent = require("../core/BaseAgent");

const {
  buildAnalysisPrompt,
} = require("../analysis/buildAnalysisPrompt");

const {
  validateAnalysis,
} = require("../analysis/validateAnalysis");

const agentConfigs = require("../config/agentConfigs");

class AnalysisAgent extends BaseAgent {
  static dependencies = [];
  constructor({ gateway }) {
    super("AnalysisAgent");

    this.gateway = gateway;

    this.config = agentConfigs.analysis;
  }

  async run(context) {

    const prompt = buildAnalysisPrompt(context);

   const result = await this.gateway.generate({
  models: this.config.models,
  prompt,
  responseType: this.config.responseType,
  temperature: this.config.temperature,
  maxTokens: this.config.maxTokens,
  systemPrompt: this.config.systemPrompt,
});

context.setModel(result.model);

const validated = validateAnalysis(result.data);

context.updateAnalysis(validated);

return validated;
  }
}

module.exports = AnalysisAgent;