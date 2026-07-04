const BaseAgent = require("../core/BaseAgent");
const { buildAnalysisPrompt } = require("../prompts/analysisPrompt");
const validateAnalysis = require("../validators/analysisValidator");

class AnalysisAgent extends BaseAgent {
  constructor({ gateway }) {
    super("AnalysisAgent");

    this.gateway = gateway;
  }

  async run(context) {
    const prompt = buildAnalysisPrompt(context.project);

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