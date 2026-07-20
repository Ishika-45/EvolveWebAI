const { randomUUID } = require("crypto");

class AIContext {
  static STATUS = Object.freeze({
    PENDING: "pending",
    RUNNING: "running",
    COMPLETED: "completed",
    FAILED: "failed",
  });

  constructor(project) {
    // ==========================================
    // Source of Truth
    // ==========================================

    this.project = project;

    // ==========================================
    // Workflow Metadata
    // ==========================================

    this.metadata = {
      executionId: randomUUID(),
      startedAt: new Date(),
      status: AIContext.STATUS.PENDING,
      currentAgent: null,
      model: null,
      version: 1,
    };

    // ==========================================
    // AI Generated Data
    // ==========================================

    this.analysis = {};
    this.branding = {};
    this.assets = {};
    this.websiteTheme = {};
    this.marketing = {};
    this.review = {};
    this.export = {};

    // ==========================================
    // Monitoring
    // ==========================================

    this.logs = [];
    this.errors = [];
  }

  // ==================================================
  // Metadata
  // ==================================================

  setStatus(status) {
    this.metadata.status = status;
  }

  setCurrentAgent(agentName) {
    this.metadata.currentAgent = agentName;
  }

  setModel(model) {
    this.metadata.model = model;
  }

  getExecutionId() {
    return this.metadata.executionId;
  }

  getStatus() {
    return this.metadata.status;
  }

  getCurrentAgent() {
    return this.metadata.currentAgent;
  }

  getModel() {
    return this.metadata.model;
  }

  // ==================================================
  // Logging
  // ==================================================

  addLog(message, level = "info") {
    this.logs.push({
      timestamp: new Date(),
      level,
      executionId: this.metadata.executionId,
      agent: this.metadata.currentAgent,
      message,
    });
  }

  // ==================================================
  // Errors
  // ==================================================

  addError(error) {
    this.errors.push({
      timestamp: new Date(),
      executionId: this.metadata.executionId,
      agent: this.metadata.currentAgent,
      message: error.message || String(error),
    });

    this.setStatus(AIContext.STATUS.FAILED);
  }

  // ==================================================
  // Generic Update
  // ==================================================

  update(section, data) {
    if (!(section in this)) {
      throw new Error(`Unknown context section: ${section}`);
    }

    this[section] = {
      ...this[section],
      ...data,
    };
  }

  updateWebsiteTheme(data) {
  this.websiteTheme = {
    ...this.websiteTheme,
    ...data,
  };
}

  // ==================================================
  // Convenience Update Methods
  // ==================================================

  updateAnalysis(data) {
    this.update("analysis", data);
  }

  updateBranding(data) {
    this.update("branding", data);
  }

  updateAssets(data) {
    this.update("assets", data);
  }

  updateMarketing(data) {
    this.update("marketing", data);
  }

  updateReview(data) {
    this.update("review", data);
  }

  updateExport(data) {
    this.update("export", data);
  }

  // ==================================================
  // Getters
  // ==================================================

  getProject() {
    return this.project;
  }

  getAnalysis() {
    return this.analysis;
  }

  getBranding() {
    return this.branding;
  }

  getAssets() {
    return this.assets;
  }

  getWebsiteTheme() {
  return this.websiteTheme;
}

  getMarketing() {
    return this.marketing;
  }

  getReview() {
    return this.review;
  }

  getExport() {
    return this.export;
  }

  // Generic getter

  get(section) {
    return this[section];
  }

  // ==================================================
  // Prompt Helpers
  // ==================================================

  getAIState() {
    return {
      analysis: this.analysis,
      branding: this.branding,
      assets: this.assets,
      website: this.website,
      marketing: this.marketing,
      review: this.review,
      export: this.export,
    };
  }

  getPromptContext() {
    return {
      project: this.project,
      analysis: this.analysis,
      branding: this.branding,
      assets: this.assets,
      website: this.website,
      marketing: this.marketing,
      review: this.review,
      export: this.export,
    };
  }

  // ==================================================
  // Serialization
  // ==================================================

  getState() {
    return this.toJSON();
  }

  toJSON() {
    return {
      project: this.project,

      metadata: this.metadata,

      analysis: this.analysis,
      branding: this.branding,
      assets: this.assets,
      websiteTheme: this.websiteTheme,
      marketing: this.marketing,
      review: this.review,
      export: this.export,

      logs: this.logs,
      errors: this.errors,
    };
  }
}

module.exports = AIContext;