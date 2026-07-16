const AIContext = require("./AIContext");

class AIOrchestrator {
  constructor({ registry, pipeline = [] }) {
    this.registry = registry;
    this.pipeline = pipeline;
  }

  async execute(project) {
    const context = new AIContext(project);

    try {
      for (const agentName of this.pipeline) {
        const agent = this.registry.get(agentName);

        await agent.execute(context);
      }

      context.setStatus(AIContext.STATUS.COMPLETED);

      return context;
    } catch (error) {
      context.addError(error);
      throw error;
    }
  }
}

module.exports = AIOrchestrator;