const express = require("express");
const OpenAI = require("openai");

const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "EvolveWeb AI",
  },
});

const parseAIResponse = (response) => {
  try {
    return JSON.parse(response);
  } catch {
    return response;
  }
};

////////////////////////////////////////////////////
//// 🧠 IDEA ANALYSIS
////////////////////////////////////////////////////
router.post("/analyze-idea", protect, async (req, res) => {
  try {
    const { projectId, idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: "You are a startup advisor." },
        {
          role: "user",
          content: `
Analyze the startup idea below.

Idea: ${idea}

Return JSON with:
- ideaScore
- strengths (3)
- weaknesses (3)
- opportunities (3)

Return ONLY JSON.
`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    const parsed = parseAIResponse(content);

    const project = await Project.findById(projectId);

    if (project) {
      project.analysis = parsed;
      await project.save();
    }

    res.json({ data: parsed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Idea analysis failed" });
  }
});

////////////////////////////////////////////////////
//// 🚀 IDEA EVOLUTION
////////////////////////////////////////////////////
router.post("/evolve-idea", protect, async (req, res) => {
  try {
    const { projectId, idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: "You are a startup strategist." },
        {
          role: "user",
          content: `
Improve this startup idea and make it more innovative.

Idea: ${idea}

Return JSON with:
- improvedIdea
- keyImprovements (3)
- uniqueAngle

Return ONLY JSON.
`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    const parsed = parseAIResponse(content);

    const project = await Project.findById(projectId);

    if (project) {
      project.evolvedIdea = parsed.improvedIdea;
      await project.save();
    }

    res.json({ data: parsed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Idea evolution failed" });
  }
});

////////////////////////////////////////////////////
//// 📊 PRODUCT BLUEPRINT
////////////////////////////////////////////////////
router.post("/generate-blueprint", protect, async (req, res) => {
  try {
    const { projectId, idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: "You are a startup product manager." },
        {
          role: "user",
          content: `
Generate a startup product blueprint.

Idea: ${idea}

Return JSON with:
- problem
- targetAudience
- coreFeatures (5)
- uniqueSellingProposition
- monetizationStrategy
- futureScope

Return ONLY JSON.
`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    const parsed = parseAIResponse(content);

    const project = await Project.findById(projectId);

    if (project) {
      project.blueprint = parsed;
      await project.save();
    }

    res.json({ data: parsed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Blueprint generation failed" });
  }
});

////////////////////////////////////////////////////
//// ✨ GENERATE WEBSITE SECTION
////////////////////////////////////////////////////
router.post("/generate-section", protect, async (req, res) => {
  try {
    const { idea, sectionTitle } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a professional SaaS product strategist.",
        },
        {
          role: "user",
          content: `
Project Idea:
${idea}

Write an improved version of the section "${sectionTitle}"

Rules:
- Professional startup tone
- Clear structure
- Bullet points when helpful
- Focus on real-world business value
`,
        },
      ],
    });

    res.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;