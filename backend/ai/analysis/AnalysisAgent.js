const BaseAgent = require("../core/BaseAgent");

const {
  buildAnalysisPrompt,
} = require("../analysis/buildAnalysisPrompt");

const {
  validateAnalysis,
} = require("../analysis/validateAnalysis");

const agentConfigs = require("../config/agentConfigs");

class AnalysisAgent extends BaseAgent {
  constructor({ gateway }) {
    super("AnalysisAgent");

    this.gateway = gateway;

    this.config = agentConfigs.analysis;
  }

  async run(context) {
    const prompt = buildAnalysisPrompt(context.project);

    const analysis = await this.gateway.generate({
      models: this.config.models,

      prompt,

      responseType: this.config.responseType,

      temperature: this.config.temperature,

      maxTokens: this.config.maxTokens,

      systemPrompt: this.config.systemPrompt,
    });

    const validated = validateAnalysis(analysis);

    context.updateAnalysis(validated);

    return validated;
  }
}

module.exports = AnalysisAgent;