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

  temperature: 0.5,

  maxTokens: 2200,

  systemPrompt:
    "You are a senior SaaS growth marketer. Return ONLY valid JSON. Keep all text concise. Do not write long paragraphs.",
},

websitePlanner: {
  models: MODEL_PROFILES.DEFAULT_FREE,
  responseType: "json",
  temperature: 0.1,
  maxTokens: 1200,
  systemPrompt:
    "You are a website planning engine. Return ONLY compact valid JSON. No reasoning, markdown, explanations, or extra fields.",
},

websiteStructure: {
  models: MODEL_PROFILES.DEFAULT_FREE,
  responseType: "json",
  temperature: 0.2,
  maxTokens: 2500,
  systemPrompt:
    "You are an expert UX Architect. Return ONLY compact valid JSON. No reasoning, markdown, explanations, or code.",
},

websiteTheme: {
  models: MODEL_PROFILES.DEFAULT_FREE,
  responseType: "json",
  temperature: 0.1,
  maxTokens: 2200,
  systemPrompt:
    "You are a UI design-system engine. Return ONLY compact valid JSON. No reasoning, markdown, explanations, or extra fields.",
},

websiteSections: {
models: MODEL_PROFILES.DEFAULT_FREE,
responseType: "json",
temperature: 0.1,
maxTokens: 3000,
systemPrompt:
"You are a JSON transformation engine. Return ONLY compact valid JSON. No reasoning, markdown, explanations, comments, or extra fields.",
},


websiteContent: {
models: MODEL_PROFILES.DEFAULT_FREE,
responseType: "json",
temperature: 0.5,
maxTokens: 1800,
systemPrompt:
"You are a senior SaaS copywriter, UX content strategist and conversion expert. Return ONLY valid JSON.",
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
