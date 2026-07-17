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
  GEMINI_FLASH: "google/gemini-2.5-flash-lite",
  DEEPSEEK: "deepseek/deepseek-r1-0528:free",
  LLAMA_3: "meta-llama/llama-3.2-3b-instruct:free",
  MISTRAL: "mistralai/mistral-7b-instruct:free",
};

// -------------------------------------
// Model Profiles
// -------------------------------------

const MODEL_PROFILES = {
  DEFAULT_FREE: [
    MODELS.GEMINI_FLASH,
    MODELS.DEEPSEEK,
    MODELS.LLAMA_3,
    MODELS.MISTRAL,
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