const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/*We will use OpenAI API to generate website code based on user prompts.
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
*/

// 🆕 CREATE PROJECT
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, generatedCode } = req.body;

    const project = await Project.create({
      user: req.user._id,
      title,
      description,
      generatedCode,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 🤖 MOCK AI WEBSITE GENERATOR
router.post("/generate", protect, async (req, res) => {
  try {
    const { title, prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Fake AI-generated HTML
    const generatedCode = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title || "AI Website"}</title>
        <style>
          body {
            font-family: Arial;
            text-align: center;
            background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
            color: white;
            padding: 50px;
          }
          .btn {
            padding: 10px 20px;
            background: #ff4b2b;
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>${title || "AI Generated Website"}</h1>
        <p>${prompt}</p>
        <button class="btn">Get Started</button>
      </body>
      </html>
    `;

    const project = await Project.create({
      user: req.user._id,
      title: title || "Mock AI Website",
      description: prompt,
      generatedCode,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Mock AI generation failed" });
  }
});

/* We'll use it with OpenAI 
// 🤖 GENERATE WEBSITE USING AI
router.post("/generate", protect, async (req, res) => {
  try {
    const { title, prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional web developer. Generate clean HTML and CSS only. No explanations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const generatedCode = response.choices[0].message.content;

    // Save project in DB
    const project = await Project.create({
      user: req.user._id,
      title: title || "AI Generated Website",
      description: prompt,
      generatedCode,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI generation failed" });
  }
});
*/

// 📄 GET ALL PROJECTS OF LOGGED-IN USER
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id/preview", protect, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) return res.status(404).send("Not found");

  if (project.user.toString() !== req.user._id.toString())
    return res.status(401).send("Not authorized");

  res.send(project.generatedCode);
});

// 🔍 GET SINGLE PROJECT
router.get("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure project belongs to logged-in user
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✏️ UPDATE PROJECT
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, description, generatedCode } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure project belongs to logged-in user
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update fields if provided
    project.title = title || project.title;
    project.description = description || project.description;
    project.generatedCode = generatedCode || project.generatedCode;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ❌ DELETE PROJECT
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;

