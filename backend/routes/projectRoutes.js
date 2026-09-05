const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");
const archiver = require("archiver");

const router = express.Router();
const orchestrator = require("../ai");
const { renderWebsite } = require("../services/websiteRenderer");

////////////////////////////////////////////////////
// 🆕 CREATE PROJECT
////////////////////////////////////////////////////
router.post("/", protect, async (req, res) => {
  try {
    const { title, idea } = req.body;

    if (!idea?.trim()) {
      return res.status(400).json({
        message: "Idea is required",
      });
    }

    const project = await Project.create({
      user: req.user._id,
      title: title?.trim() || "Untitled Project",
      idea: idea.trim(),
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Project creation error:", error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
});

////////////////////////////////////////////////////
// 📄 GET ALL PROJECTS OF LOGGED-IN USER
////////////////////////////////////////////////////
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

////////////////////////////////////////////////////
// 🔍 GET SINGLE PROJECT
////////////////////////////////////////////////////
router.get("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

////////////////////////////////////////////////////
// 🌐 PROJECT PREVIEW (GENERATED WEBSITE)
////////////////////////////////////////////////////
router.get("/:id/preview", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).send("Project not found");

    if (project.user.toString() !== req.user._id.toString())
      return res.status(401).send("Not authorized");

    res.send(project.generated.html || "<h1>No website generated yet</h1>");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

////////////////////////////////////////////////////
// ✏️ UPDATE PROJECT
////////////////////////////////////////////////////
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, idea, generatedCode } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (project.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    project.title = title || project.title;
    project.idea = idea || project.idea;
    
    project.generated.html = generatedCode || project.generated.html;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

////////////////////////////////////////////////////
// ❌ DELETE PROJECT
////////////////////////////////////////////////////
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (project.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await project.deleteOne();

    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

////////////////////////////////////////////////////
// 🚀 GENERATE WEBSITE FROM AI ORCHESTRATOR
////////////////////////////////////////////////////
router.post("/:id/generate-website", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    console.log("🚀 Starting AI website generation...");

    // Run the new multi-agent pipeline
    const context = await orchestrator.execute(project);

    console.log(
      `✅ AI pipeline completed: ${context.getExecutionId()}`
    );

    // -----------------------------------------------------
    // Persist structured AI output
    // -----------------------------------------------------

    project.analysis = context.getAnalysis();

    project.branding = context.getBranding();

    project.assets = {
      ...project.assets?.toObject?.(),
      ...context.getAssets(),
    };

    project.marketing = context.getMarketing();

    // The current orchestrator stores website planning +
    // structure inside the generic `website` context section.
    project.websitePlanner = context.getWebsite();

    project.websiteTheme = context.getWebsiteTheme();

    project.websiteSections = context.getWebsiteSections();

    project.websiteContent = context.getWebsiteContent();

    // -----------------------------------------------------
// Deterministic website rendering
// -----------------------------------------------------

const websiteHtml = renderWebsite({
  project,
  website: context.getWebsite(),
  websiteTheme: context.getWebsiteTheme(),
  websiteSections: context.getWebsiteSections(),
  websiteContent: context.getWebsiteContent(),
  branding: context.getBranding(),
  marketing: context.getMarketing(),
});

project.generated.html = websiteHtml;

    // -----------------------------------------------------
    // Generation metadata
    // -----------------------------------------------------

    project.generation = {
      model: context.getModel() || "",
      generatedAt: new Date(),
      version: 1,
    };

    await project.save();

    return res.json({
      success: true,
      message: "AI website pipeline completed successfully",

      projectId: project._id,

      generation: project.generation,

      data: {
        analysis: context.getAnalysis(),
        branding: context.getBranding(),
        assets: context.getAssets(),
        marketing: context.getMarketing(),
        website: context.getWebsite(),
        websiteTheme: context.getWebsiteTheme(),
        websiteSections: context.getWebsiteSections(),
        websiteContent: context.getWebsiteContent(),
      },
    });
  } catch (error) {
    console.error("AI WEBSITE GENERATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Website generation failed",
      error: error.message,
    });
  }
});

////////////////////////////////////////////////////
// 📦 EXPORT PROJECT AS ZIP
////////////////////////////////////////////////////
router.get("/:id/export-zip", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (project.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    const websiteCode =
      project.generated.html ||
      "<!DOCTYPE html><html><body><h1>No website generated yet</h1></body></html>";

    const safeTitle = (project.title || "website")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    // headers
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${safeTitle}.zip`
    );

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error(err);
      res.status(500).end();
    });

    archive.pipe(res);

    // 🧾 index.html
    archive.append(websiteCode, { name: "index.html" });

    // 📄 README
    archive.append(
      `# ${project.title || "AI Website"}

Generated using your AI builder 🚀

## Idea
${project.idea || "No idea provided"}

## Files
- index.html

Open index.html in browser to view your site.
`,
      { name: "README.md" }
    );

    await archive.finalize();
  } catch (error) {
    console.error("ZIP export failed:", error);
    res.status(500).json({ message: "ZIP export failed" });
  }
});

module.exports = router;