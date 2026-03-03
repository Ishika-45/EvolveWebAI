const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate-section", async (req, res) => {
  try {
    const { idea, sectionTitle } = req.body;

    if (!idea || !sectionTitle) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional product strategist AI that writes structured, impactful, production-ready content.",
        },
        {
          role: "user",
          content: `
Project Idea:
${idea}

Improve this section professionally:
${sectionTitle}

Keep it structured, strategic, and impactful.
          `,
        },
      ],
      temperature: 0.7,
    });

    res.json({
      content: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;