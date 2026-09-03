const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",

  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "EvolveWeb AI",
  },
});

// -------------------------------------
// Available Models
// -------------------------------------

const MODELS = {
  FREE_ROUTER: "openrouter/free",
};

// -------------------------------------
// Model Profiles
// -------------------------------------

const MODEL_PROFILES = {
  DEFAULT_FREE: [
    MODELS.FREE_ROUTER,
  ],
};

// -------------------------------------
// Generic AI Call
// -------------------------------------

async function makeAICall({
  model,
  messages,
  temperature = 0.7,
  max_tokens = 2000,
}) {
  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens,
  });

  return completion.choices[0].message.content;
}

module.exports = {
  MODELS,
  MODEL_PROFILES,
  makeAICall,
};