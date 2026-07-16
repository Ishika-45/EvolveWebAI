const { makeAICall } = require("../config/ai");

const AIServiceGateway = require("./gateways/AIServiceGateway");

const AnalysisAgent = require("./analysis/AnalysisAgent");
const BrandAgent = require("./branding/BrandAgent");

const AgentRegistry = require("./core/AgentRegistry");
const AIOrchestrator = require("./core/AIOrchestrator");

const gateway = new AIServiceGateway({
  aiClient: makeAICall,
});

const analysisAgent = new AnalysisAgent({ gateway });
const brandAgent = new BrandAgent({ gateway });

const registry = new AgentRegistry();

registry.register(analysisAgent);
registry.register(brandAgent);

const orchestrator = new AIOrchestrator({
  registry,
  pipeline: [
    "AnalysisAgent",
    "BrandAgent",
  ],
});

module.exports = orchestrator;