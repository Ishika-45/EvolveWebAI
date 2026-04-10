// backend/config/ai.js
const OpenAI = require("openai");

// Initialize OpenRouter client
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "EvolveWeb AI",
  },
});

// FREE MODELS (no credits required)
const FREE_MODELS = {
  // Best quality free model
  GEMINI_FLASH: "google/gemini-2.0-flash-lite-preview-02-05:free",
  
  // Alternative free models (backup options)
  LLAMA_3: "meta-llama/llama-3.2-3b-instruct:free",
  PHI_3: "microsoft/phi-3-mini-128k-instruct:free",
  MISTRAL: "mistralai/mistral-7b-instruct:free",
};

// Use Gemini Flash as default (good quality and free)
const DEFAULT_MODEL = FREE_MODELS.GEMINI_FLASH;

// Helper function to make AI calls with free models
async function makeAICall(messages, options = {}) {
  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages,
      max_tokens: options.max_tokens || 2000, // Limit tokens to save credits
      temperature: options.temperature || 0.7,
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(`AI Call Error with ${DEFAULT_MODEL}:`, error.message);
    
    // Try fallback model if primary fails
    if (DEFAULT_MODEL !== FREE_MODELS.LLAMA_3) {
      console.log("Trying fallback model: LLAMA 3");
      const fallbackCompletion = await openai.chat.completions.create({
        model: FREE_MODELS.LLAMA_3,
        messages: messages,
        max_tokens: options.max_tokens || 2000,
        temperature: options.temperature || 0.7,
      });
      return fallbackCompletion.choices[0].message.content;
    }
    
    throw error;
  }
}

module.exports = { openai, FREE_MODELS, DEFAULT_MODEL, makeAICall };