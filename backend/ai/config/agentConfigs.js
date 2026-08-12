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
  models: [
    "google/gemini-2.5-flash-lite"
  ],

  responseType: "json",

  temperature: 0.5,

  maxTokens: 3500,

  systemPrompt:
    "You are an expert SaaS Product Designer, UX Architect and Full Stack Website Planner. Always return valid JSON."
},
websitePlanner: {
  models: [
    "google/gemini-2.5-flash-lite"
  ],

  responseType: "json",

  temperature: 0.4,

  maxTokens: 1200,

  systemPrompt:
    "You are an expert Product Manager and Website Strategist. Return ONLY valid JSON."
},

websiteStructure: {

  models: [
    "google/gemini-2.5-flash-lite"
  ],

  responseType: "json",

  temperature: 0.3,

  maxTokens: 1400,

  systemPrompt:
    "You are an expert UX Architect. Return ONLY valid JSON."

},

websiteTheme: {

  models: [
    "google/gemini-2.5-flash-lite"
  ],

  responseType: "json",

  temperature: 0.7,

  maxTokens: 2500,

  systemPrompt:
    "You are an award-winning UI/UX Design System Architect. Return ONLY valid JSON."

},

websiteSections: {
  models: [
    "google/gemini-2.5-flash-lite"
  ],

  responseType: "json",
  temperature: 0.2,
  maxTokens: 3500,

  systemPrompt:
    "You are an expert UX Architect. Return ONLY valid JSON.",
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