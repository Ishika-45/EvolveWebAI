const { MODEL_PROFILES } = require("../../config/ai");

module.exports = {
  analysis: {
    models: MODEL_PROFILES.DEFAULT_FREE,

    responseType: "json",
    temperature: 0.4,
    maxTokens: 1200,
    systemPrompt:
      "You are a senior startup consultant. Return ONLY valid JSON.",
  },

  branding: {
    models: MODEL_PROFILES.DEFAULT_FREE,

    responseType: "json",
    temperature: 0.8,
    maxTokens: 1500,
    systemPrompt:
      "You are an expert brand strategist. Return ONLY valid JSON.",
  },

  assets: {
    models: MODEL_PROFILES.DEFAULT_FREE,

    responseType: "json",
    temperature: 0.7,
    maxTokens: 1800,
    systemPrompt:
      "You are an expert UI/UX designer. Return ONLY valid JSON.",
  },
  marketing: {
  models: MODEL_PROFILES.DEFAULT_FREE,

  responseType: "json",

  temperature: 0.7,

  maxTokens: 1800,

  systemPrompt:
    "You are a senior SaaS growth marketer. Return ONLY valid JSON.",
},


  website: {
    models: MODEL_PROFILES.DEFAULT_FREE,

    responseType: "text",
    temperature: 0.3,
    maxTokens: 5000,
    systemPrompt:
      "You are a senior full-stack engineer.",
  },

  review: {
    models: MODEL_PROFILES.DEFAULT_FREE,

    responseType: "json",
    temperature: 0.2,
    maxTokens: 1200,
    systemPrompt:
      "You are a senior software architect and reviewer. Return ONLY valid JSON.",
  },
};