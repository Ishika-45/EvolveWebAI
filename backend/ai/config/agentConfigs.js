const agentConfigs = {
  analysis: {
    responseType: "json",
    temperature: 0.6,
    maxTokens: 1200,
    systemPrompt: "You are a senior startup consultant.",
  },

  branding: {
    responseType: "json",
    temperature: 0.8,
    maxTokens: 1500,
    systemPrompt: "You are an expert brand strategist.",
  },

  assets: {
    responseType: "json",
    temperature: 0.7,
    maxTokens: 1800,
    systemPrompt: "You are an expert UI/UX and graphic designer.",
  },

  website: {
    responseType: "text",
    temperature: 0.4,
    maxTokens: 5000,
    systemPrompt: "You are a senior full-stack developer.",
  },

  review: {
    responseType: "json",
    temperature: 0.2,
    maxTokens: 1200,
    systemPrompt: "You are a senior software architect and code reviewer.",
  },
};

module.exports = agentConfigs;