const BaseAgent = require("../core/BaseAgent");
const {
  buildAnalysisPrompt,
} = require("../analysis/buildAnalysisPrompt");
const {
  validateAnalysis,
} = require("../analysis/validateAnalysis");

class AnalysisAgent extends BaseAgent {
  constructor({ gateway }) {
    super("AnalysisAgent");

    this.gateway = gateway;
  }

  async run(context) {
    const prompt = buildAnalysisPrompt(context);

    const analysis = await this.gateway.generate({
      prompt,
      responseType: "json",
      temperature: 0.6,
      maxTokens: 1200,
    });

    const validated = validateAnalysis(analysis);

    context.updateAnalysis(validated);

    return validated;
  }
}

module.exports = AnalysisAgent;