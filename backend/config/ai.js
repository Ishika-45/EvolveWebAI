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
  NEX_N2_PRO: "nex-agi/nex-n2.5-pro:free",
  // FREE_ROUTER: "openrouter/free",
};

// -------------------------------------
// Model Profiles
// -------------------------------------

const MODEL_PROFILES = {
  DEFAULT_FREE: [
    MODELS.NEX_N2_PRO,
    // MODELS.FREE_ROUTER,
  ],
};

// -------------------------------------
// Default Model
// -------------------------------------

const DEFAULT_MODEL = MODELS.NEX_N2_PRO;

// -------------------------------------
// Generic AI Call
// -------------------------------------

async function makeAICall(arg1, arg2 = {}) {
  let model;
  let messages;
  let temperature;
  let max_tokens;
  let response_format;

  // Convention 1:
  // makeAICall(messages, options)
  if (Array.isArray(arg1)) {
    messages = arg1;

    const options = arg2 || {};

    model = options.model || DEFAULT_MODEL;
    temperature = options.temperature ?? 0.7;
    max_tokens = options.max_tokens ?? 2000;
    response_format = options.response_format;
  }

  // Convention 2:
  // makeAICall({ model, messages, ... })
  else if (arg1 && typeof arg1 === "object") {
    ({
      model,
      messages,
      temperature = 0.7,
      max_tokens = 2000,
      response_format,
    } = arg1);

    model = model || DEFAULT_MODEL;
  }

  else {
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
    ...(response_format
      ? { response_format }
      : {}),
  });

  const message = completion?.choices?.[0]?.message;

  if (!message) {
    throw new Error("AI provider returned no message.");
  }

  if (!message.content) {
    throw new Error(
      `AI provider returned no content. Finish reason: ${
        completion?.choices?.[0]?.finish_reason || "unknown"
      }`
    );
  }

  return message.content;
}

module.exports = {
  MODELS,
  MODEL_PROFILES,
  DEFAULT_MODEL,
  openai,
  makeAICall,
};