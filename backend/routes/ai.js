const express = require("express");
const OpenAI = require("openai");

const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

////////////////////////////////////////////////////
// OPENROUTER CLIENT
////////////////////////////////////////////////////
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "EvolveWeb AI",
  },
});

////////////////////////////////////////////////////
// SAFE JSON PARSER
////////////////////////////////////////////////////
const parseAIResponse = (response) => {
  try {
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("AI returned invalid JSON:", response);
    return response;
  }
};

////////////////////////////////////////////////////
// 🧠 IDEA ANALYSIS
////////////////////////////////////////////////////
router.post("/analyze-idea", protect, async (req, res) => {
  try {
    const { projectId, idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: "You are an expert startup advisor." },
        {
          role: "user",
          content: `
Analyze this startup idea.

Idea: ${idea}

Return JSON only:

{
 "ideaScore": number,
 "strengths": [],
 "weaknesses": [],
 "opportunities": []
}
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
    console.error("IDEA ANALYSIS ERROR:", error);
    res.status(500).json({ error: "Idea analysis failed" });
  }
});

////////////////////////////////////////////////////
// 🚀 IDEA EVOLUTION
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
Improve this startup idea.

Idea: ${idea}

Return JSON:

{
 "improvedIdea": "",
 "keyImprovements": [],
 "uniqueAngle": ""
}
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
    console.error("EVOLUTION ERROR:", error);
    res.status(500).json({ error: "Idea evolution failed" });
  }
});

////////////////////////////////////////////////////
// 📊 PRODUCT BLUEPRINT
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
Generate a product blueprint.

Idea: ${idea}

Return JSON:

{
 "problem": "",
 "targetAudience": "",
 "coreFeatures": [],
 "uniqueSellingProposition": "",
 "monetizationStrategy": "",
 "futureScope": ""
}
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
    console.error("BLUEPRINT ERROR:", error);
    res.status(500).json({ error: "Blueprint generation failed" });
  }
});

////////////////////////////////////////////////////
// ✨ GENERATE WEBSITE SECTION
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
Startup Idea:
${idea}

Write a professional "${sectionTitle}" section for a startup website.

Rules:
- Clear
- Professional
- Bullet points when useful
`,
        },
      ],
    });

    res.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("SECTION ERROR:", error);
    res.status(500).json({ error: "Section generation failed" });
  }
});

////////////////////////////////////////////////////
// 🌐 GENERATE WEBSITE STRUCTURE
////////////////////////////////////////////////////
router.post("/generate-website", protect, async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a startup website architect.",
        },
        {
          role: "user",
          content: `
Generate a landing page structure.

Idea:
${idea}

Return JSON:

{
 "sections":[
  "Hero",
  "Problem",
  "Solution",
  "Features",
  "How It Works",
  "Pricing",
  "Testimonials",
  "Call To Action",
  "Footer"
 ]
}
`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    const parsed = parseAIResponse(content);

    res.json(parsed);
  } catch (error) {
    console.error("WEBSITE STRUCTURE ERROR:", error);
    res.status(500).json({ error: "Website generation failed" });
  }
});

////////////////////////////////////////////////////
// ⚡ STREAM AI RESPONSE
////////////////////////////////////////////////////
router.post("/generate-stream", protect, async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are an expert startup website architect.",
        },
        {
          role: "user",
          content: `Generate website sections for: ${idea}.
Return each section on a new line.`,
        },
      ],
    });

    res.setHeader("Content-Type", "text/plain");

    for await (const chunk of completion) {
      const content = chunk.choices?.[0]?.delta?.content;

      if (content) {
        res.write(content);
      }
    }

    res.end();
  } catch (error) {
    console.error("STREAM ERROR:", error);
    res.status(500).json({ message: "Streaming failed" });
  }
});

const generateReactWebsite = require("../services/aiWebsiteGenerator");

router.post("/build-website", protect, async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const websiteCode = await generateReactWebsite(project);

    project.generatedWebsite = websiteCode;
    await project.save();

    res.json({
      code: websiteCode
    });

  } catch (error) {

    console.error("BUILD WEBSITE ERROR:", error);

    res.status(500).json({
      error: "Website build failed"
    });

  }
});

module.exports = router;