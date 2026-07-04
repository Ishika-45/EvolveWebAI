const AIContext = require("./AIContext");

class BaseAgent {
  constructor(name) {
    if (!name) {
      throw new Error("Agent name is required.");
    }

    this.name = name;
  }

  async execute(context) {
    this.start(context);

    try {
      const result = await this.run(context);

      this.success(context);

      return result;
    } catch (error) {
      this.fail(context, error);

      throw error;
    }
  }

  async run() {
    throw new Error(`${this.name} must implement run(context).`);
  }

  start(context) {
    context.setCurrentAgent(this.name);
    context.setStatus(AIContext.STATUS.RUNNING);

    context.addLog(`${this.name} started.`);
  }

  success(context) {
    context.setStatus(AIContext.STATUS.COMPLETED);

    context.addLog(`${this.name} completed.`);
  }

  fail(context, error) {
    context.addError(error);

    context.addLog(`${this.name} failed.`, "error");
  }
}

module.exports = BaseAgent;