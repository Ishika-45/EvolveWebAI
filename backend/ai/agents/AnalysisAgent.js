const BaseAgent = require("../core/BaseAgent");

const {
    buildAnalysisPrompt,
} = require("../prompts/analysisPrompt");

const validateAnalysis = require("../validators/analysisValidator");

class AnalysisAgent extends BaseAgent {
    constructor({ gateway }) {
        super("AnalysisAgent");

        this.gateway = gateway;
    }

    async execute(context) {
        this.start(context);

        try {
            const prompt = buildAnalysisPrompt(context.project);

            const analysis = await this.gateway.generateAnalysis(prompt);

            const validated = validateAnalysis(analysis);

            context.update("analysis", validated);

            this.success(context);

            return validated;
        } catch (error) {
            this.fail(context, error);

            throw error;
        }
    }
}

module.exports = AnalysisAgent;