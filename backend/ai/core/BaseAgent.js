class BaseAgent {
  constructor(context) {
    if (!context) {
      throw new Error("AIContext is required.");
    }

    this.context = context;

    // Frequently used references
    this.project = context.project;
    this.metadata = context.metadata;

    // Shared services
    this.logger = context.logger;
    this.gateway = context.gateway;
    this.validator = context.validator;
  }

  /**
   * Every child agent must implement this.
   */
  async execute() {
    throw new Error(
      `${this.constructor.name} must implement execute().`
    );
  }

  /**
   * Add a log entry.
   */
  log(message) {
    this.context.addLog(message);
  }

  /**
   * Record an error.
   */
  fail(error) {
    this.context.addError(error);
  }

  /**
   * Mark the current agent.
   */
  setCurrentAgent(name) {
    this.context.currentAgent = name;
  }
}

module.exports = BaseAgent;