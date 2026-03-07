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

// 🧠 ANALYZE STARTUP IDEA
router.post("/analyze-idea", async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a startup advisor."
        },
        {
          role: "user",
          content: `
Analyze the following startup idea.

Idea: ${idea}

Return JSON with:
- ideaScore
- strengths (3 points)
- weaknesses (3 points)
- opportunities (3 points)

Return ONLY JSON.
`
        }
      ]
    });

    res.json({
      content: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Idea analysis failed" });
  }
});

// 🚀 EVOLVE IDEA
router.post("/evolve-idea", async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a startup product strategist."
        },
        {
          role: "user",
          content: `
Improve this startup idea and make it more innovative.

Idea: ${idea}

Return JSON with:
- improvedIdea
- keyImprovements (3 points)
- uniqueAngle

Return ONLY JSON.
`
        }
      ]
    });

    res.json({
      content: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Idea evolution failed" });
  }
});

// 📊 GENERATE PRODUCT BLUEPRINT
router.post("/generate-blueprint", async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a startup product manager."
        },
        {
          role: "user",
          content: `
Create a product blueprint for the following startup idea.

Idea: ${idea}

Return JSON with:
- problem
- targetAudience
- coreFeatures (5 items)
- uniqueSellingProposition
- monetizationStrategy
- futureScope

Return ONLY JSON.
`
        }
      ]
    });

    res.json({
      content: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Blueprint generation failed" });
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