const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "EvolveWeb AI"
  }
});

router.post("/generate-section", async (req, res) => {
  try {
    const { idea, sectionTitle } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a professional SaaS product strategist."
        },
        {
          role: "user",
          content: `
You are an expert SaaS product strategist.

Project Idea:
${idea}

Write an improved version of the section:
"${sectionTitle}"

Rules:
- Professional startup tone
- Clear structure
- Bullet points when helpful
- Focus on real-world business value
- Maximum clarity and impact
`
        }
      ],
      temperature: 0.7
    });

    res.json({
      content: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;