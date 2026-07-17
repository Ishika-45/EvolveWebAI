const AIContext = require("./AIContext");

class AIOrchestrator {
  constructor({ registry }) {
    this.registry = registry;
  }

  async execute(project) {
    const context = new AIContext(project);

    const pipeline = [
      "analysis",
      "branding",
    ];

    for (const agentName of pipeline) {
      const agent = this.registry.get(agentName);

      await agent.execute(context);
    }

    context.setStatus("completed");

    return context;
  }
}

module.exports = AIOrchestrator;