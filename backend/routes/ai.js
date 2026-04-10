// backend/routes/ai.js
const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");
const { makeAICall, DEFAULT_MODEL, openai } = require("../config/ai");

const router = express.Router();

// Safe JSON parser
const parseAIResponse = (response) => {
  try {
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.log("AI returned invalid JSON, using fallback");
    return null;
  }
};

// 🧠 IDEA ANALYSIS
router.post("/analyze-idea", protect, async (req, res) => {
  try {
    const { projectId, idea } = req.body;

    const content = await makeAICall([
      { role: "system", content: "You are an expert startup advisor. Return ONLY valid JSON, no other text." },
      {
        role: "user",
        content: `Analyze this startup idea: "${idea}"

Return ONLY this JSON format (no markdown, no other text):
{
  "ideaScore": 75,
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2"],
  "opportunities": ["opportunity1", "opportunity2"]
}`,
      },
    ], { max_tokens: 500 });

    const parsed = parseAIResponse(content);
    
    const project = await Project.findById(projectId);
    if (project && parsed) {
      project.analysis = parsed;
      await project.save();
    }

    res.json({ data: parsed || {
      ideaScore: 75,
      strengths: ["Unique value proposition", "Large target market"],
      weaknesses: ["Competition exists", "Execution challenges"],
      opportunities: ["Partnership opportunities", "Global expansion"]
    }});
  } catch (error) {
    console.error("IDEA ANALYSIS ERROR:", error);
    res.json({ 
      data: {
        ideaScore: 70,
        strengths: ["Innovative concept", "Scalable solution"],
        weaknesses: ["Market education needed", "Initial development cost"],
        opportunities: ["Early adopter program", "Integration partnerships"]
      }
    });
  }
});

// 🚀 IDEA EVOLUTION
router.post("/evolve-idea", protect, async (req, res) => {
  try {
    const { projectId, idea } = req.body;

    const content = await makeAICall([
      { role: "system", content: "You are a startup strategist. Return ONLY valid JSON." },
      {
        role: "user",
        content: `Improve this startup idea: "${idea}"

Return ONLY this JSON format:
{
  "improvedIdea": "your improved version here",
  "keyImprovements": ["improvement1", "improvement2", "improvement3"],
  "uniqueAngle": "what makes this unique"
}`,
      },
    ], { max_tokens: 500 });

    const parsed = parseAIResponse(content);
    
    const project = await Project.findById(projectId);
    if (project && parsed) {
      project.evolvedIdea = parsed.improvedIdea;
      await project.save();
    }

    res.json({ data: parsed || {
      improvedIdea: idea + " with AI-powered features and community-driven growth",
      keyImprovements: ["AI integration", "User engagement features", "Analytics dashboard"],
      uniqueAngle: "Combining AI with community feedback"
    }});
  } catch (error) {
    console.error("EVOLUTION ERROR:", error);
    res.json({ 
      data: {
        improvedIdea: idea + " with enhanced AI capabilities",
        keyImprovements: ["Better UX", "Faster performance", "More integrations"],
        uniqueAngle: "AI-first approach to problem solving"
      }
    });
  }
});

// 📊 PRODUCT BLUEPRINT
router.post("/generate-blueprint", protect, async (req, res) => {
  try {
    const { projectId, idea } = req.body;

    const content = await makeAICall([
      { role: "system", content: "You are a startup product manager. Return ONLY valid JSON." },
      {
        role: "user",
        content: `Create a product blueprint for: "${idea}"

Return ONLY this JSON format:
{
  "problem": "what problem it solves",
  "targetAudience": "who it's for",
  "coreFeatures": ["feature1", "feature2", "feature3"],
  "uniqueSellingProposition": "what makes it unique",
  "monetizationStrategy": "how it makes money",
  "futureScope": "future possibilities"
}`,
      },
    ], { max_tokens: 600 });

    const parsed = parseAIResponse(content);
    
    const project = await Project.findById(projectId);
    if (project && parsed) {
      project.blueprint = parsed;
      await project.save();
    }

    res.json({ data: parsed || {
      problem: "Users struggle with inefficient solutions",
      targetAudience: "Tech-savvy professionals and businesses",
      coreFeatures: ["AI-powered analytics", "User-friendly dashboard", "Real-time updates"],
      uniqueSellingProposition: "AI-first approach with seamless integration",
      monetizationStrategy: "Freemium with premium features",
      futureScope: "Enterprise solutions and API access"
    }});
  } catch (error) {
    console.error("BLUEPRINT ERROR:", error);
    res.json({ 
      data: {
        problem: "Solving complex problems with simple AI solutions",
        targetAudience: "Startups and growing businesses",
        coreFeatures: ["Smart automation", "Intuitive interface", "Scalable architecture"],
        uniqueSellingProposition: "Powered by cutting-edge AI technology",
        monetizationStrategy: "Subscription-based with tiered pricing",
        futureScope: "Global expansion and enterprise features"
      }
    });
  }
});

// 🌐 GENERATE WEBSITE STRUCTURE
router.post("/generate-website", protect, async (req, res) => {
  try {
    const { idea } = req.body;

    const content = await makeAICall([
      {
        role: "system",
        content: "You are a startup website architect. Return ONLY valid JSON.",
      },
      {
        role: "user",
        content: `Generate a landing page structure for: "${idea}"

Return ONLY this JSON format:
{
  "sections": [
    "Hero Section",
    "Problem Statement",
    "Solution Overview",
    "Key Features",
    "How It Works",
    "Pricing Plans",
    "Testimonials",
    "Call to Action",
    "Footer"
  ]
}`,
      },
    ], { max_tokens: 400 });

    const parsed = parseAIResponse(content);
    
    res.json(parsed || {
      sections: [
        "Hero Section",
        "Problem Statement",
        "Solution Overview",
        "Key Features",
        "How It Works",
        "Pricing Plans",
        "Testimonials",
        "Call to Action",
        "Footer"
      ]
    });
  } catch (error) {
    console.error("WEBSITE STRUCTURE ERROR:", error);
    res.json({
      sections: [
        "Hero Section",
        "Problem Statement",
        "Solution Overview",
        "Key Features",
        "How It Works",
        "Pricing Plans",
        "Testimonials",
        "Call to Action",
        "Footer"
      ]
    });
  }
});

// ⚡ STREAM AI RESPONSE
router.post("/generate-stream", protect, async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are an expert startup website architect. Keep responses concise.",
        },
        {
          role: "user",
          content: `Generate 5-7 website sections for: "${idea}". Return each section on a new line. Keep it simple and professional.`,
        },
      ],
      max_tokens: 300,
    });

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache");

    for await (const chunk of completion) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        res.write(content);
      }
    }
    res.end();
  } catch (error) {
    console.error("STREAM ERROR:", error);
    // Send fallback response
    const fallbackSections = [
      "Hero Section\n",
      "Problem Statement\n",
      "Solution Overview\n",
      "Key Features\n",
      "How It Works\n",
      "Pricing Plans\n",
      "Testimonials\n",
      "Call to Action\n",
      "Footer\n"
    ];
    res.write(fallbackSections.join(""));
    res.end();
  }
});

// 🎨 GENERATE WEBSITE SECTION
router.post("/generate-section", protect, async (req, res) => {
  try {
    const { idea, sectionTitle } = req.body;

    const content = await makeAICall([
      {
        role: "system",
        content: "You are a professional copywriter for startup websites.",
      },
      {
        role: "user",
        content: `For a startup with this idea: "${idea}"
        
Write compelling content for the "${sectionTitle}" section.

Keep it concise, professional, and engaging (2-3 sentences or bullet points).`,
      },
    ], { max_tokens: 300 });

    res.json({ content: content || `Welcome to our innovative solution for ${idea}. Discover how we can transform your experience.` });
  } catch (error) {
    console.error("SECTION ERROR:", error);
    res.json({ 
      content: `Discover how our AI-powered solution for ${idea} can help you achieve your goals faster and more efficiently.` 
    });
  }
});

// 🏗️ BUILD WEBSITE (uses generateWebsiteHtml service)
const generateWebsiteHtml = require("../services/aiWebsiteGenerator");

router.post("/build-website", protect, async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "projectId is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const websiteCode = await generateWebsiteHtml(project);
    if (!websiteCode || typeof websiteCode !== "string") {
      return res.status(500).json({ error: "Invalid website code generated" });
    }

    project.generatedWebsite = websiteCode;
    await project.save();

    return res.json({
      success: true,
      code: websiteCode,
    });
  } catch (error) {
    console.error("BUILD WEBSITE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Website build failed",
      details: error.message,
    });
  }
});

module.exports = router;