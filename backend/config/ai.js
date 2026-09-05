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
  LLAMA_3_3_8B: "meta-llama/llama-3.3-8b-instruct:free",
  MISTRAL_7B: "mistralai/mistral-7b-instruct:free",
  QWEN_3_4B: "qwen/qwen3-4b:free",
};

// -------------------------------------
// Model Profiles
// -------------------------------------
//
// DEFAULT_FREE tries the random free-model router first (fast, usually
// fine), then falls back to specific, known-reliable instruct models if
// that fails or returns unusable output (reasoning traces instead of
// JSON, rate limits, etc). Plain instruct models are used for the
// fallbacks specifically because they don't emit chain-of-thought text,
// unlike some models the random router can select.

const MODEL_PROFILES = {
  DEFAULT_FREE: [
    MODELS.FREE_ROUTER,
    MODELS.LLAMA_3_3_8B,
    MODELS.MISTRAL_7B,
    MODELS.QWEN_3_4B,
  ],
};

// -------------------------------------
// Default Model
// -------------------------------------

const DEFAULT_MODEL = MODELS.FREE_ROUTER;

// -------------------------------------
// Generic AI Call
// -------------------------------------
//
// Supports two calling conventions used across this codebase:
//   1) makeAICall(messagesArray, { model, temperature, max_tokens, response_format })
//   2) makeAICall({ model, messages, temperature, max_tokens, response_format })

async function makeAICall(arg1, arg2 = {}) {
  let model, messages, temperature, max_tokens, response_format;

  if (Array.isArray(arg1)) {
    // Convention 1: makeAICall(messages, options)
    messages = arg1;
    const options = arg2 || {};
    model = options.model || DEFAULT_MODEL;
    temperature = options.temperature ?? 0.7;
    max_tokens = options.max_tokens ?? 2000;
    response_format = options.response_format;
  } else if (arg1 && typeof arg1 === "object") {
    // Convention 2: makeAICall({ model, messages, temperature, max_tokens, response_format })
    ({
      model,
      messages,
      temperature = 0.7,
      max_tokens = 2000,
      response_format,
    } = arg1);
    model = model || DEFAULT_MODEL;
  } else {
    throw new Error(
      "makeAICall: expected either (messages[], options) or ({ model, messages, ... })"
    );
  }

  if (!messages) {
    throw new Error("makeAICall: 'messages' is required.");
  }

  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens,
    ...(response_format ? { response_format } : {}),
  });

  return completion.choices[0].message.content;
}

module.exports = {
  MODELS,
  MODEL_PROFILES,
  DEFAULT_MODEL,
  openai,
  makeAICall,
};