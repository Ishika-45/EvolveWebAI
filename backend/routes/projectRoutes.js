const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

////////////////////////////////////////////////////
// 🆕 CREATE PROJECT
////////////////////////////////////////////////////
router.post("/", protect, async (req, res) => {
  try {
    const { title, idea } = req.body;

    const project = await Project.create({
      user: req.user._id,
      title,
      idea,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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

    res.send(project.generatedCode || "<h1>No website generated yet</h1>");
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
    project.generatedCode = generatedCode || project.generatedCode;

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

module.exports = router;