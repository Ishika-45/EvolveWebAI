import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  Pencil,
  Copy,
  Check,
  History,
  Sparkles,
  Loader2,
  Eye,
  FileCode,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import api from "../services/api";
import LiveWebsitePreview from "../components/LiveWebsitePreview";

const normalizeSection = (section, index = 0) => {
  if (typeof section === "string") {
    return {
      title: section.trim() || `Section ${index + 1}`,
      description: "",
    };
  }

  if (section && typeof section === "object") {
    return {
      title:
        section.title?.trim() ||
        section.name?.trim() ||
        section.heading?.trim() ||
        `Section ${index + 1}`,
      description:
        section.description?.trim() ||
        section.content?.trim() ||
        section.summary?.trim() ||
        "",
    };
  }

  return {
    title: `Section ${index + 1}`,
    description: "",
  };
};

const normalizeSections = (sections) => {
  if (!Array.isArray(sections)) return [];
  return sections.map((section, index) => normalizeSection(section, index));
};

const normalizeBlueprint = (blueprint) => {
  if (!blueprint || typeof blueprint !== "object") return null;

  return {
    problem: blueprint.problem || "",
    targetAudience: blueprint.targetAudience || "",
    uniqueSellingProposition: blueprint.uniqueSellingProposition || "",
    monetizationStrategy: blueprint.monetizationStrategy || "",
    futureScope: blueprint.futureScope || "",
    coreFeatures: Array.isArray(blueprint.coreFeatures)
      ? blueprint.coreFeatures
      : [],
  };
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedProject = location.state?.project;

  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIdea, setEditedIdea] = useState("");
  const [viewMode, setViewMode] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [editPulse, setEditPulse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAIComplete, setShowAIComplete] = useState(true);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);
  const [showVersions, setShowVersions] = useState(false);
  const [blueprint, setBlueprint] = useState(null);
  const [generatingBlueprint, setGeneratingBlueprint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteError, setDeleteError] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [buildingWebsite, setBuildingWebsite] = useState(false);
  const [focusPreview, setFocusPreview] = useState(false);
  const [pageError, setPageError] = useState("");
  const [expandedBlueprintCard, setExpandedBlueprintCard] = useState(null);
  const [buildError, setBuildError] = useState("");

  const normalizedSections = useMemo(
    () => normalizeSections(project?.sections),
    [project?.sections]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAIComplete(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (passedProject && !project) {
      setProject({
        ...passedProject,
        sections: normalizeSections(passedProject.sections),
      });
      setEditedIdea(passedProject.idea || "");
    }
  }, [passedProject, project]);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      setPageError("");

      try {
        const res = await api.get(`/projects/${id}`);
        const data = res.data?.project || res.data;

        if (!data) {
          throw new Error("Project not found");
        }

        const normalizedProject = {
          ...data,
          sections: normalizeSections(data.sections),
        };

        setProject(normalizedProject);
        setEditedIdea(normalizedProject.idea || "");
        setBlueprint(normalizeBlueprint(normalizedProject.blueprint));
        setGeneratedCode(normalizedProject.generatedWebsite || "");
      } catch (error) {
        console.error("Failed to load project:", error);

        const message =
          error?.response?.status === 404
            ? "Project not found"
            : error?.response?.data?.message || "Failed to load project";

        setPageError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (!project) return;

    if (project.blueprint) {
      setBlueprint(normalizeBlueprint(project.blueprint));
      return;
    }

    generateBlueprint(project.idea);
  }, [project?.idea]); // eslint-disable-line react-hooks/exhaustive-deps

  const persistProjectUpdate = async (updatedProject) => {
    const payload = {
      ...updatedProject,
      sections: normalizeSections(updatedProject.sections),
    };

    const res = await api.put(`/projects/${id}`, payload);
    const savedProject = res.data?.project || res.data;

    const normalizedSavedProject = {
      ...savedProject,
      sections: normalizeSections(savedProject.sections),
    };

    setProject(normalizedSavedProject);
    setEditedIdea(normalizedSavedProject.idea || "");
    setBlueprint(normalizeBlueprint(normalizedSavedProject.blueprint));
   setGeneratedCode((prev) => normalizedSavedProject.generatedWebsite || prev);

    return normalizedSavedProject;
  };

const buildWebsite = async () => {
  try {
    setBuildingWebsite(true);
    setBuildError("");

    const res = await api.post("/ai/build-website", {
      projectId: id,
    });

    const code = res.data?.code || "";
    if (!code) {
      throw new Error("No code returned from backend");
    }

    setGeneratedCode(code);
    setFocusPreview(true);
  } catch (error) {
    console.error("Website build failed:", error);
    setBuildError(
      error?.response?.data?.details ||
      error?.response?.data?.error ||
      error?.message ||
      "Website build failed"
    );
  } finally {
    setBuildingWebsite(false);
  }
};

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      await api.delete(`/projects/${id}`);

      setTimeout(() => {
        navigate("/dashboard", {
          state: { message: "Project deleted successfully" },
        });
      }, 400);
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete project"
      );
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleRegenerateSection = async (index) => {
    if (!project) return;

    setRegeneratingIndex(index);

    try {
      const currentSections = normalizeSections(project.sections);
      const sectionToRegenerate = currentSections[index];

      const response = await api.post("/ai/generate-section", {
        idea: project.idea,
        sectionTitle: sectionToRegenerate.title,
      });

      const previousVersion = {
        idea: project.idea,
        sections: currentSections,
        timestamp: new Date().toLocaleString(),
      };

      const updatedSections = [...currentSections];
      updatedSections[index] = {
        ...updatedSections[index],
        description:
          response.data?.content ||
          response.data?.description ||
          updatedSections[index].description,
      };

      const updatedProject = {
        ...project,
        sections: updatedSections,
        versions: [...(project.versions || []), previousVersion],
      };

      await persistProjectUpdate(updatedProject);
    } catch (error) {
      console.error("AI section regeneration error:", error);
    } finally {
      setRegeneratingIndex(null);
    }
  };

  const generateBlueprint = async (ideaOverride) => {
    const sourceIdea = ideaOverride || project?.idea;
    if (!sourceIdea) return;

    setGeneratingBlueprint(true);

    try {
      const response = await api.post("/ai/generate-blueprint", {
        projectId: id,
        idea: sourceIdea,
      });

      const responseData = response.data?.data || response.data?.blueprint || response.data;
      const nextBlueprint = normalizeBlueprint(responseData);

      if (!nextBlueprint) return;

      setBlueprint(nextBlueprint);

      if (project) {
        const updatedProject = {
          ...project,
          blueprint: nextBlueprint,
        };

        await persistProjectUpdate(updatedProject);
      }
    } catch (error) {
      console.error("Blueprint AI error:", error);
    } finally {
      setGeneratingBlueprint(false);
    }
  };

  const saveProjectChanges = async (updatedProject) => {
    try {
      await persistProjectUpdate(updatedProject);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleSaveIdea = async () => {
    if (!project) return;

    const previousVersion = {
      idea: project.idea,
      sections: normalizedSections,
      timestamp: new Date().toLocaleString(),
    };

    const updatedProject = {
      ...project,
      idea: editedIdea.trim(),
      versions: [...(project.versions || []), previousVersion],
    };

    setIsEditing(false);
    await saveProjectChanges(updatedProject);
    await generateBlueprint(editedIdea.trim());
  };

  const generateCode = () => {
    if (!blueprint) return "// No blueprint yet";

    return `import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <section className="px-8 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">${project.title}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          ${blueprint.uniqueSellingProposition}
        </p>
      </section>

      <section className="px-8 pb-20 grid md:grid-cols-3 gap-6">
        ${blueprint.coreFeatures
          ?.map(
            (f) => `
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-indigo-400 font-semibold mb-2">Feature</h3>
          <p className="text-gray-300">${f}</p>
        </div>`
          )
          .join("")}
      </section>

      <section className="px-8 pb-24 text-center">
        <button className="px-6 py-3 bg-indigo-500 rounded-xl">
          Get Started
        </button>
      </section>
    </div>
  );
}
`;
  };

  const blueprintCards = blueprint
    ? [
        {
          title: "Problem",
          icon: "⚠️",
          content: blueprint.problem,
        },
        {
          title: "Target Audience",
          icon: "👥",
          content: blueprint.targetAudience,
        },
        {
          title: "Solution",
          icon: "💡",
          content: blueprint.uniqueSellingProposition,
        },
        {
          title: "Business Model",
          icon: "💰",
          content: blueprint.monetizationStrategy,
        },
        {
          title: "Core Features",
          icon: "⚡",
          content:
            blueprint.coreFeatures?.length > 0
              ? blueprint.coreFeatures.join(", ")
              : "",
        },
        {
          title: "Future Scope",
          icon: "🚀",
          content: blueprint.futureScope,
        },
      ]
    : [];

  const renderWebsitePreviewSection = () => {
    if (!blueprint) return null;

    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-400 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Website Preview
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-400 ml-4">
              ai-generated-site.vercel.app
            </span>
          </div>

          <div className="p-8 md:p-12 bg-gradient-to-br from-[#0b1020] via-[#11162a] to-[#1a1f3a]">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm mb-5">
                <Sparkles size={14} />
                AI-Powered Startup
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent mb-4">
                {project.title}
              </h1>

              <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                {blueprint.uniqueSellingProposition || "A modern AI startup experience."}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white shadow-lg shadow-indigo-500/20">
                  Get Started
                </button>
                <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white">
                  Watch Demo
                </button>
              </div>
            </div>

            {blueprint.coreFeatures?.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {blueprint.coreFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition"
                  >
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center mb-4 font-semibold">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Feature {i + 1}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-10 max-w-6xl mx-auto text-white min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your project...</p>
        </div>
      </motion.div>
    );
  }

  if (!project || pageError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-10 max-w-6xl mx-auto text-white min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Project Not Found</h2>
          <p className="text-gray-400 mb-6">
            {pageError || "The project you're looking for doesn't exist or has been deleted."}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
          >
            Return to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={
        isDeleting
          ? { opacity: 0, scale: 0.9, y: 50 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 md:p-10 max-w-6xl mx-auto text-white"
    >
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-3">
          {!showDeleteConfirm ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
            >
              <Trash2 size={16} />
              Delete
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1"
            >
              <span className="text-sm text-gray-400 px-2">Are you sure?</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 text-sm hover:bg-white/20 transition"
              >
                No
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {deleteError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
        >
          {deleteError}
        </motion.div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-4">{project.title}</h1>

        <p className="text-gray-400 mb-3">
          Created on{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : project.date || "Recently"}
        </p>

        <AnimatePresence>
          {showAIComplete && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.2)]"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AI Generation Complete
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <h2 className="text-lg font-medium text-indigo-400">
            {project.title || "Title to be decided..."}
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              onClick={() => {
                setIsEditing(!isEditing);
                setEditPulse(true);
                setTimeout(() => setEditPulse(false), 400);
              }}
              whileTap={{ scale: 0.9 }}
              className={`relative p-2 rounded-lg transition hover:bg-white/10 ${
                isEditing ? "text-indigo-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <Pencil size={18} />
              {editPulse && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-lg bg-indigo-500/30"
                />
              )}
            </motion.button>

            <motion.button
              onClick={() => {
                navigator.clipboard.writeText(project.idea || "");
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-gray-400 hover:text-white transition hover:bg-white/10"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={18} className="text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.div
              layout
              className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-sm cursor-pointer backdrop-blur-xl"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`absolute top-1 bottom-1 w-1/2 rounded-lg ${
                  viewMode === "preview"
                    ? "left-1 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "right-1 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                }`}
              />

              <div
                onClick={() => setViewMode("preview")}
                className={`relative z-10 px-4 py-1.5 transition flex items-center gap-1 ${
                  viewMode === "preview"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Eye size={14} />
                Preview
              </div>

              <div
                onClick={() => setViewMode("code")}
                className={`relative z-10 px-4 py-1.5 transition flex items-center gap-1 ${
                  viewMode === "code"
                    ? "text-indigo-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <FileCode size={14} />
                Code
              </div>
            </motion.div>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editedIdea}
              onChange={(e) => setEditedIdea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSaveIdea();
                }
              }}
              className="w-full min-h-[140px] bg-transparent border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-indigo-500/50 transition"
              placeholder="Edit your idea..."
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedIdea(project.idea || "");
                }}
                className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveIdea}
                className="px-4 py-2 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : viewMode === "preview" ? (
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.idea}
          </div>
        ) : (
          <pre className="text-green-400 text-sm whitespace-pre-wrap bg-black/30 p-4 rounded-xl overflow-x-auto">
            {generateCode()}
          </pre>
        )}
      </div>

      <div className="mt-10 mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-400 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          AI Startup Blueprint
        </h2>

        {generatingBlueprint ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-gray-400">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>AI is analyzing your idea...</span>
            </motion.div>
            <p className="text-sm mt-3 text-gray-500">
              Identifying problem, audience, and solution...
            </p>
          </div>
        ) : blueprint ? (
          <div className="grid md:grid-cols-2 gap-6">
            {blueprintCards.map((item, index) => {
              const isExpanded = expandedBlueprintCard === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  onClick={() =>
                    setExpandedBlueprintCard(isExpanded ? null : index)
                  }
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                          {item.title}
                        </h3>
                        <p className={`text-gray-400 text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
                          {item.content || "Not available yet"}
                        </p>
                      </div>
                    </div>

                    <div className="text-gray-400 mt-1">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && item.title === "Core Features" && blueprint.coreFeatures?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <div className="flex flex-wrap gap-2">
                          {blueprint.coreFeatures.map((feature, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : null}
      </div>

      {renderWebsitePreviewSection()}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowVersions(!showVersions)}
        className="mt-10 mb-6 px-4 py-2 rounded-xl flex items-center gap-2 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 transition"
      >
        <History size={16} />
        {showVersions ? "Hide" : "View"} Version History
        {project.versions?.length > 0 && (
          <span className="ml-1 px-2 py-0.5 bg-indigo-500/20 rounded-full text-xs">
            {project.versions.length}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {showVersions && project.versions?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden"
          >
            <h3 className="text-lg font-semibold mb-4 text-indigo-400 flex items-center gap-2">
              <History className="w-5 h-5" />
              Version History
            </h3>

            <div className="space-y-3">
              {project.versions.map((version, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="p-4 bg-black/30 rounded-xl border border-white/5"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-400 font-mono">
                      Version {project.versions.length - index}
                    </p>
                    <p className="text-xs text-gray-500">{version.timestamp}</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                    {version.idea}
                  </p>
                  <button
                    onClick={() => {
                      const restoredProject = {
                        ...project,
                        idea: version.idea,
                        sections: normalizeSections(version.sections),
                        versions: project.versions,
                      };

                      saveProjectChanges(restoredProject);
                    }}
                    className="text-xs px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition"
                  >
                    Restore This Version
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {normalizedSections.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Generated Sections
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {normalizedSections.map((section, index) => (
              <motion.div
                key={`${section.title}-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition ${
                  regeneratingIndex === index ? "ring-1 ring-indigo-400/40" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-lg font-semibold text-purple-400">
                    {section.title}
                  </h3>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRegenerateSection(index)}
                    disabled={regeneratingIndex !== null}
                    className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {regeneratingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      "Regenerate"
                    )}
                  </motion.button>
                </div>

                {regeneratingIndex === index ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-sm flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    AI is improving this section...
                  </motion.div>
                ) : (
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {section.description || "No description generated yet."}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}

      <div className="mt-14 text-center">
        <button
          onClick={buildWebsite}
          disabled={buildingWebsite}
          className="px-8 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 mx-auto disabled:opacity-50 shadow-lg shadow-indigo-500/20"
        >
          {buildingWebsite ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Building Website...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Build AI Website
            </>
          )}
        </button>
      </div>

      {generatedCode && (
        <LiveWebsitePreview
          code={generatedCode}
          focusPreview={focusPreview}
          setFocusPreview={setFocusPreview}
        />
      )}
    </motion.div>
  );
};

export default ProjectDetails;