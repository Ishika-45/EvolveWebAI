class AgentRegistry {
  constructor() {
    this.agents = new Map();
  }

  register(agent) {
    this.agents.set(agent.name, agent);
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