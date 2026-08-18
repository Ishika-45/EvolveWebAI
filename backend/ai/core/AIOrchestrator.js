const AIContext = require("./AIContext");

class AIOrchestrator {
  constructor({ registry }) {
    this.registry = registry;
  }

  async execute(project) {
    const context = new AIContext(project);

    context.setStatus(AIContext.STATUS.RUNNING);

    const pipeline = [
      "analysis",
      "branding",
      "assets",
      "marketing",

      // Website planning pipeline
      "websitePlanner",
      "websiteStructure",
      "websiteTheme",
      "websiteSections",
      "websiteContent",
    ];

    for (const agentName of pipeline) {
      const agent = this.registry.get(agentName);

      await agent.execute(context);
    }

    context.setStatus(AIContext.STATUS.COMPLETED);

    return context;
  }
}

module.exports = AIOrchestrator;