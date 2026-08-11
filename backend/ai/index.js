const { makeAICall } = require("../config/ai");

const AIServiceGateway = require("./gateways/AIServiceGateway");

const AgentRegistry = require("./core/AgentRegistry");
const AIOrchestrator = require("./core/AIOrchestrator");

// Domains
const { AnalysisAgent } = require("./analysis");
const { BrandAgent } = require("./branding");
const { AssetsAgent } = require("./assets");
const { MarketingAgent } = require("./marketing");
const { WebsiteThemeAgent } = require("./websiteTheme");
const { WebsitePlannerAgent } = require("./websitePlanner");
const { WebsiteStructureAgent } = require("./websiteStructure");
const WebsiteSectionAgent = require("./websiteSections/WebsiteSectionAgent");

// ----------------------------------
// Infrastructure
// ----------------------------------

const gateway = new AIServiceGateway({
  aiClient: makeAICall,
});

// ----------------------------------
// Registry
// ----------------------------------

const registry = new AgentRegistry();

registry.register(
  "analysis",
  new AnalysisAgent({ gateway })
);

registry.register(
  "branding",
  new BrandAgent({ gateway })
);

registry.register(
  "assets",
  new AssetsAgent({ gateway })
);

registry.register(
  "websitePlanner",
  new WebsitePlannerAgent({ gateway })
);

registry.register(
  "websiteStructure",
  new WebsiteStructureAgent({ gateway })
);

registry.register(
  "websiteSections",
  new WebsiteSectionAgent({ gateway })
);

registry.register(
  "websiteTheme",
  new WebsiteThemeAgent({ gateway })
);

registry.register(
  "marketing",
  new MarketingAgent({ gateway })
);
// ----------------------------------`
// Orchestrator
// ----------------------------------

const orchestrator = new AIOrchestrator({
  registry,
});

module.exports = orchestrator;