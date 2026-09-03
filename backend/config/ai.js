const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "EvolveWeb AI",
  },
});

const MODELS = {
  FREE_ROUTER: "openrouter/free",
};

const MODEL_PROFILES = {
  DEFAULT_FREE: [MODELS.FREE_ROUTER],
};

async function makeAICall({
  model,
  messages,
  temperature = 0.7,
  max_tokens = 2000,
  response_format,
}) {
  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens,
    ...(response_format ? { response_format } : {}),
  });

  const content = completion.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI provider returned an empty response.");
  }

  return content;
}

module.exports = {
  MODELS,
  MODEL_PROFILES,
  makeAICall,
};