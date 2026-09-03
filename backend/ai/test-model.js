const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

// -------------------------------------
// OpenRouter Client
// -------------------------------------

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",

  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "EvolveWeb AI",
  },
});

// -------------------------------------
// Test
// -------------------------------------

async function main() {
  console.log("\n🧪 Testing OpenRouter JSON generation...\n");

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemma-4-26b-a4b-it:free",

      messages: [
        {
          role: "system",
          content:
            "You are a JSON API. Return ONLY valid JSON. No markdown. No explanation. No reasoning.",
        },
        {
          role: "user",
          content: `
Return exactly this JSON structure:

{
  "name": "EvolveWeb AI",
  "type": "AI SaaS",
  "colors": ["#2C3E50", "#1ABC9C", "#F1C40F"],
  "features": ["Planning", "Branding", "Website Generation"]
}

Do not add any other fields.
Do not add any text outside the JSON.
          `,
        },
      ],

      temperature: 0.2,
      max_tokens: 500,

      response_format: {
        type: "json_object",
      },
    });

    const content = completion.choices?.[0]?.message?.content;

    console.log("📦 Raw response:\n");
    console.log(content);

    if (!content) {
      throw new Error("Empty response from provider.");
    }

    console.log("\n🔍 Parsing JSON...\n");

    const parsed = JSON.parse(content);

    console.log("✅ JSON IS VALID!\n");
    console.log(JSON.stringify(parsed, null, 2));

    console.log("\n🎉 MODEL TEST PASSED\n");
  } catch (error) {
    console.error("\n❌ MODEL TEST FAILED\n");

    console.error("Error:", error.message);

    if (error.status) {
      console.error("Status:", error.status);
    }

    if (error.code) {
      console.error("Code:", error.code);
    }

    if (error.response?.data) {
      console.error(
        "Provider:",
        JSON.stringify(error.response.data, null, 2)
      );
    }
  }
}

main();