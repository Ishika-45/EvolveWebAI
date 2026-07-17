const { randomUUID } = require("crypto");

class AIContext {
  static STATUS = {
    PENDING: "pending",
    RUNNING: "running",
    COMPLETED: "completed",
    FAILED: "failed",
  };

  constructor(project) {
    // ==========================
    // Source of Truth
    // ==========================
    this.project = project;

    // ==========================
    // Workflow Metadata
    // ==========================
    this.metadata = {
      executionId: randomUUID(),
      startedAt: new Date(),
      status: AIContext.STATUS.PENDING,
      currentAgent: null,
      model: null,
      version: 1,
    };

    // ==========================
    // Domain Data
    // ==========================
    this.analysis = {};
this.branding = {};
this.assets = {};
this.website = {};
this.marketing = {};
this.review = {};
this.export = {};

    // ==========================
    // Monitoring
    // ==========================
    this.logs = [];
    this.errors = [];
  }

  // ==========================
  // Metadata
  // ==========================

  setStatus(status) {
    this.metadata.status = status;
  }

  setCurrentAgent(agentName) {
    this.metadata.currentAgent = agentName;
  }

  setModel(model) {
    this.metadata.model = model;
  }

  // ==========================
  // Logging
  // ==========================

  addLog(message, level = "info") {
    this.logs.push({
      timestamp: new Date(),
      level,
      executionId: this.metadata.executionId,
      agent: this.metadata.currentAgent,
      message,
    });
  }

  // ==========================
  // Errors
  // ==========================

  addError(error) {
    this.errors.push({
      timestamp: new Date(),
      executionId: this.metadata.executionId,
      agent: this.metadata.currentAgent,
      message: error.message || error,
    });

    this.setStatus(AIContext.STATUS.FAILED);
  }

  // ==========================
  // Domain Updates
  // ==========================

  updateAnalysis(data) {
  this.analysis = {
    ...this.analysis,
    ...data,
  };
}

updateBranding(data) {
  this.branding = {
    ...this.branding,
    ...data,
  };
}

updateAssets(data) {
  this.assets = {
    ...this.assets,
    ...data,
  };
}

updateWebsite(data) {
  this.website = {
    ...this.website,
    ...data,
  };
}

updateMarketing(data) {
  this.marketing = {
    ...this.marketing,
    ...data,
  };
}

updateReview(data) {
  this.review = {
    ...this.review,
    ...data,
  };
}

updateExport(data) {
  this.export = {
    ...this.export,
    ...data,
  };
}
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
    website: this.website,
    marketing: this.marketing,
    review: this.review,
    export: this.export,

    logs: this.logs,
    errors: this.errors,
  };
}
}

module.exports = AIContext;