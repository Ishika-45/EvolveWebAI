class AgentRegistry {
  constructor() {
    this.agents = new Map();
  }

  register(name, agent) {
    if (!name) {
      throw new Error("Agent name is required.");
    }

    if (!agent) {
      throw new Error("Agent instance is required.");
    }

    if (this.agents.has(name)) {
      throw new Error(`Agent "${name}" is already registered.`);
    }

    this.agents.set(name, agent);
  }

  get(name) {
    const agent = this.agents.get(name);

    if (!agent) {
      throw new Error(`Agent "${name}" is not registered.`);
    }

    return agent;
  }

  has(name) {
    return this.agents.has(name);
  }

  getAll() {
    return [...this.agents.values()];
  }
}

module.exports = AgentRegistry;