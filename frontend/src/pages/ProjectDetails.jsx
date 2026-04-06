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
  Download,
  Monitor,
  Smartphone,
  Tablet,
  Wand2,
  RefreshCw,
} from "lucide-react";
import api from "../services/api";
import LiveWebsitePreview from "../components/LiveWebsitePreview";

const normalizeSection = (section, index = 0) => {
  if (typeof section === "string") {
    return {
      id: `section-${index}`,
      title: section.trim() || `Section ${index + 1}`,
      description: "",
    };
  }

  if (section && typeof section === "object") {
    return {
      id: section.id || `section-${index}`,
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
    id: `section-${index}`,
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
  const [blueprint, setBlueprint] = useState(null);
  const [editedIdea, setEditedIdea] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [buildError, setBuildError] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [generatingBlueprint, setGeneratingBlueprint] = useState(false);
  const [buildingWebsite, setBuildingWebsite] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);

  const [isEditingIdea, setIsEditingIdea] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAIComplete, setShowAIComplete] = useState(true);
  const [showVersions, setShowVersions] = useState(false);

  const [viewMode, setViewMode] = useState("preview");
  const [focusPreview, setFocusPreview] = useState(false);
  const [deviceMode, setDeviceMode] = useState("desktop");

  const [expandedBlueprintCard, setExpandedBlueprintCard] = useState(null);

  const normalizedSections = useMemo(
    () => normalizeSections(project?.sections),
    [project?.sections]
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowAIComplete(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (passedProject && !project) {
      const normalizedProject = {
        ...passedProject,
        sections: normalizeSections(passedProject.sections),
      };

      setProject(normalizedProject);
      setEditedIdea(normalizedProject.idea || "");
      setBlueprint(normalizeBlueprint(normalizedProject.blueprint));
      setGeneratedCode(normalizedProject.generatedWebsite ?? "");
    }
  }, [passedProject, project]);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      setPageError("");

      try {
        const res = await api.get(`/projects/${id}`);
        const data = res.data?.project || res.data;

        if (!data) throw new Error("Project not found");

        const normalizedProject = {
          ...data,
          sections: normalizeSections(data.sections),
        };

        setProject(normalizedProject);
        setEditedIdea(normalizedProject.idea || "");
        setBlueprint(normalizeBlueprint(normalizedProject.blueprint));
        setGeneratedCode(normalizedProject.generatedWebsite ?? "");
      } catch (error) {
        console.error("Failed to load project:", error);
        setPageError(
          error?.response?.status === 404
            ? "Project not found"
            : error?.response?.data?.message || "Failed to load project"
        );
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
    } else if (project.idea) {
      generateBlueprint(project.idea);
    }
  }, [project?.idea, project?.blueprint]);

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
    setGeneratedCode(normalizedSavedProject.generatedWebsite ?? "");

    return normalizedSavedProject;
  };

  const saveProjectChanges = async (updatedProject) => {
    try {
      await persistProjectUpdate(updatedProject);
    } catch (error) {
      console.error("Failed to save project:", error);
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

      const responseData =
        response.data?.data || response.data?.blueprint || response.data;

      const nextBlueprint = normalizeBlueprint(responseData);
      if (!nextBlueprint) return;

      setBlueprint(nextBlueprint);

      setProject((prev) =>
        prev
          ? {
              ...prev,
              blueprint: nextBlueprint,
            }
          : prev
      );

      if (project) {
        await persistProjectUpdate({
          ...project,
          blueprint: nextBlueprint,
        });
      }
    } catch (error) {
      console.error("Blueprint AI error:", error);
    } finally {
      setGeneratingBlueprint(false);
    }
  };

  const handleSaveIdea = async () => {
    if (!project) return;

    const trimmedIdea = editedIdea.trim();
    if (!trimmedIdea) return;

    const previousVersion = {
      idea: project.idea,
      sections: normalizedSections,
      timestamp: new Date().toLocaleString(),
    };

    const updatedProject = {
      ...project,
      idea: trimmedIdea,
      blueprint: null,
      generatedWebsite: "",
      versions: [...(project.versions || []), previousVersion],
    };

    setIsEditingIdea(false);
    setGeneratedCode("");
    setBlueprint(null);

    await saveProjectChanges(updatedProject);
    await generateBlueprint(trimmedIdea);
  };

  const buildWebsite = async () => {
    try {
      setBuildingWebsite(true);
      setBuildError("");

      const res = await api.post("/ai/build-website", {
        projectId: id,
      });

      const code =
        res.data?.code ||
        res.data?.generatedWebsite ||
        res.data?.websiteCode ||
        "";

      if (!code) {
        throw new Error("No code returned from backend");
      }

      setGeneratedCode(code);
      setProject((prev) =>
        prev
          ? {
              ...prev,
              generatedWebsite: code,
            }
          : prev
      );

      setViewMode("preview");
      setFocusPreview(true);
    } catch (error) {
      console.error("Website build failed:", error);
      setBuildError(
        error?.response?.data?.details ||
          error?.response?.data?.error ||
          error?.response?.data?.message ||
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
      navigate("/dashboard", {
        state: { message: "Project deleted successfully" },
      });
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

  const copyIdea = async () => {
    try {
      await navigator.clipboard.writeText(project?.idea || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode || generateFallbackCode());
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1200);
    } catch (error) {
      console.error("Code copy failed:", error);
    }
  };

  const downloadCodeFile = () => {
    const codeToDownload = generatedCode || generateFallbackCode();
    const blob = new Blob([codeToDownload], {
      type: "text/html;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(project?.title || "ai-website")
      .toLowerCase()
      .replace(/\s+/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadZip = async () => {
    try {
      const response = await api.get(`/projects/${id}/export-zip`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(project?.title || "website")
        .toLowerCase()
        .replace(/\s+/g, "-")}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("ZIP download failed:", error);
      alert("ZIP export endpoint not connected yet. Create /projects/:id/export-zip on backend.");
    }
  };

  const generateFallbackCode = () => {
    if (!blueprint) return "// No blueprint yet";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>${project?.title || "AI Website"}</title>
</head>
<body class="min-h-screen bg-[#050816] text-white">
  <section class="px-8 py-24 text-center">
    <h1 class="text-5xl font-bold mb-6">${project?.title || "Project Title"}</h1>
    <p class="text-gray-400 max-w-2xl mx-auto">
      ${blueprint.uniqueSellingProposition || ""}
    </p>
    <div class="mt-8 flex justify-center gap-4">
      <button class="px-6 py-3 bg-indigo-500 rounded-xl">Get Started</button>
      <button class="px-6 py-3 border border-white/20 rounded-xl">Learn More</button>
    </div>
  </section>
</body>
</html>`;
  };

  const blueprintCards = blueprint
    ? [
        {
          id: "problem",
          title: "Problem",
          icon: "⚠️",
          content: blueprint.problem,
        },
        {
          id: "audience",
          title: "Target Audience",
          icon: "👥",
          content: blueprint.targetAudience,
        },
        {
          id: "solution",
          title: "Solution",
          icon: "💡",
          content: blueprint.uniqueSellingProposition,
        },
        {
          id: "business",
          title: "Business Model",
          icon: "💰",
          content: blueprint.monetizationStrategy,
        },
        {
          id: "features",
          title: "Core Features",
          icon: "⚡",
          content:
            blueprint.coreFeatures?.length > 0
              ? blueprint.coreFeatures.join(", ")
              : "",
        },
        {
          id: "future",
          title: "Future Scope",
          icon: "🚀",
          content: blueprint.futureScope,
        },
      ]
    : [];

  const previewWidthClass =
    deviceMode === "mobile"
      ? "max-w-[380px]"
      : deviceMode === "tablet"
      ? "max-w-[820px]"
      : "max-w-full";

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-10 max-w-6xl mx-auto text-white min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[var(--theme-accent)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--theme-textSecondary)]">Loading your project...</p>
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
          <h2 className="text-2xl font-semibold text-white mb-2">
            Project Not Found
          </h2>
          <p className="text-[var(--theme-textSecondary)] mb-6">
            {pageError ||
              "The project you're looking for doesn't exist or has been deleted."}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl text-white transition"
            style={{
              background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
              boxShadow: `0 0 20px var(--theme-glow)`
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={
        isDeleting
          ? { opacity: 0, scale: 0.98, y: 30 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-6 md:p-10 max-w-7xl mx-auto text-white"
    >
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--theme-textSecondary)] hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-3">
          {!showDeleteConfirm ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition"
            >
              <Trash2 size={16} />
              Delete
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-[var(--theme-cardBg)] border border-[var(--theme-borderColor)] rounded-xl p-1"
            >
              <span className="text-sm text-gray-400 px-2">Are you sure?</span>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Yes"
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 text-sm hover:bg-white/20 transition"
              >
                No
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {deleteError && (
        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {deleteError}
        </div>
      )}

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-xs mb-4">
          <Sparkles size={12} />
          Premium AI Project Workspace
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold mb-3">
          {project.title}
        </h1>

        <p className="text-[var(--theme-textSecondary)]">
          Created on{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : project.date || "Recently"}
        </p>

        <AnimatePresence>
          {showAIComplete && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AI Generation Complete
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--theme-accent)] flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          AI Startup Blueprint
        </h2>

        {generatingBlueprint ? (
          <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-3xl p-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-[var(--theme-accent)] animate-spin" />
              <span>AI is analyzing your idea...</span>
            </div>
            <p className="text-sm mt-3 text-gray-500">
              Identifying problem, audience, solution, and growth scope...
            </p>
          </div>
        ) : blueprint ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blueprintCards.map((item, index) => {
              const isExpanded = expandedBlueprintCard === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-3xl p-6 hover:bg-white/10 transition"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedBlueprintCard(isExpanded ? null : item.id)
                    }
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--theme-accent)] mb-2">
                            {item.title}
                          </h3>
                          <p
                            className={`text-[var(--theme-textSecondary)] text-sm leading-relaxed ${
                              isExpanded ? "" : "line-clamp-2"
                            }`}
                          >
                            {item.content || "Not available yet"}
                          </p>
                        </div>
                      </div>

                      <div className="text-gray-400 mt-1 shrink-0">
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded &&
                      item.id === "features" &&
                      blueprint.coreFeatures?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-[var(--theme-borderColor)]"
                        >
                          <div className="flex flex-wrap gap-2">
                            {blueprint.coreFeatures.map((feature, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-xs"
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
        ) : (
          <div className="bg-[var(--theme-cardBg)] border border-[var(--theme-borderColor)] rounded-3xl p-8 text-gray-400">
            No blueprint available yet.
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-[var(--theme-accent)] flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Website Preview
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-white/5 border border-[var(--theme-borderColor)] rounded-xl p-1">
              <button
                onClick={() => setDeviceMode("desktop")}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition ${
                  deviceMode === "desktop"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Monitor size={15} />
                Desktop
              </button>
              <button
                onClick={() => setDeviceMode("tablet")}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition ${
                  deviceMode === "tablet"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Tablet size={15} />
                Tablet
              </button>
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition ${
                  deviceMode === "mobile"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Smartphone size={15} />
                Mobile
              </button>
            </div>

            <div className="flex items-center bg-white/5 border border-[var(--theme-borderColor)] rounded-xl p-1">
              <button
                onClick={() => setViewMode("preview")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition ${
                  viewMode === "preview"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Eye size={15} />
                Preview
              </button>
              <button
                onClick={() => setViewMode("code")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition ${
                  viewMode === "code"
                    ? "bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FileCode size={15} />
                Code
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-3xl p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-sm text-gray-300 font-medium">
                {generatedCode
                  ? "Generated website is ready"
                  : "No website generated yet"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Preview, inspect code, and export files
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={copyCode}
                className="px-4 py-2 rounded-xl bg-white/10 border border-[var(--theme-borderColor)] hover:bg-white/20 transition text-sm flex items-center gap-2"
              >
                {copiedCode ? <Check size={15} /> : <Copy size={15} />}
                {copiedCode ? "Copied" : "Copy Code"}
              </button>

              <button
                onClick={downloadCodeFile}
                className="px-4 py-2 rounded-xl bg-white/10 border border-[var(--theme-borderColor)] hover:bg-white/20 transition text-sm flex items-center gap-2"
              >
                <Download size={15} />
                Download Code
              </button>

              <button
                onClick={downloadZip}
                className="px-4 py-2 rounded-xl bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 hover:bg-[var(--theme-accent)]/30 transition text-sm flex items-center gap-2"
              >
                <Download size={15} />
                Download ZIP
              </button>
            </div>
          </div>

          <div className={`mx-auto transition-all duration-300 ${previewWidthClass}`}>
            {viewMode === "preview" ? (
              generatedCode ? (
                <LiveWebsitePreview
                  code={generatedCode}
                  focusPreview={focusPreview}
                  setFocusPreview={setFocusPreview}
                />
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-14 text-center">
                  <Wand2 className="w-10 h-10 text-[var(--theme-accent)] mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Build your first live website
                  </h3>
                  <p className="text-sm text-gray-400 max-w-xl mx-auto">
                    Refine the idea below, save your updates, and generate a premium AI website preview.
                  </p>
                </div>
              )
            ) : (
              <pre className="text-green-400 text-sm whitespace-pre-wrap bg-black/40 p-5 rounded-2xl overflow-x-auto border border-[var(--theme-borderColor)] min-h-[300px]">
                {generatedCode || generateFallbackCode()}
              </pre>
            )}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-3xl p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--theme-accent)] flex items-center gap-2">
                <Pencil className="w-5 h-5" />
                Refine Idea
              </h2>
              <p className="text-sm text-[var(--theme-textSecondary)] mt-2">
                Update the product direction before generating the final website.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={copyIdea}
                className="px-4 py-2 rounded-xl bg-white/10 border border-[var(--theme-borderColor)] hover:bg-white/20 transition text-sm flex items-center gap-2"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy Idea"}
              </button>

              <button
                onClick={() => setIsEditingIdea((prev) => !prev)}
                className="px-4 py-2 rounded-xl bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 hover:bg-[var(--theme-accent)]/30 transition text-sm flex items-center gap-2"
              >
                <Pencil size={15} />
                {isEditingIdea ? "Close Editor" : "Edit Idea"}
              </button>
            </div>
          </div>

          {isEditingIdea ? (
            <div className="space-y-4">
              <textarea
                value={editedIdea}
                onChange={(e) => setEditedIdea(e.target.value)}
                className="w-full min-h-[200px] bg-black/20 border border-[var(--theme-borderColor)] rounded-2xl p-4 text-gray-200 focus:outline-none focus:border-[var(--theme-accent)]/50 transition"
                placeholder="Refine your idea here..."
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsEditingIdea(false);
                    setEditedIdea(project.idea || "");
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveIdea}
                  className="px-4 py-2 rounded-xl text-white transition flex items-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                  }}
                >
                  <RefreshCw size={15} />
                  Save & Regenerate Blueprint
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--theme-borderColor)] bg-black/20 p-5">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.idea}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mb-12 text-center">
        <button
          onClick={buildWebsite}
          disabled={buildingWebsite}
          className="px-8 py-3 rounded-xl text-white transition flex items-center gap-2 mx-auto disabled:opacity-50"
          style={{
            background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
            boxShadow: `0 0 20px var(--theme-glow)`
          }}
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

        {buildError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm max-w-2xl mx-auto">
            {buildError}
          </div>
        )}
      </section>

      {normalizedSections.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--theme-accent)] flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Generated Sections
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {normalizedSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className={`bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6 hover:bg-white/10 transition ${
                  regeneratingIndex === index ? "ring-1 ring-[var(--theme-accent)]/40" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-lg font-semibold text-[var(--theme-accent)]">
                    {section.title}
                  </h3>

                  <button
                    onClick={() => handleRegenerateSection(index)}
                    disabled={regeneratingIndex !== null}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {regeneratingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      "Regenerate"
                    )}
                  </button>
                </div>

                {regeneratingIndex === index ? (
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[var(--theme-accent)] animate-spin" />
                    AI is improving this section...
                  </div>
                ) : (
                  <p className="text-[var(--theme-textSecondary)] text-sm leading-relaxed whitespace-pre-wrap">
                    {section.description || "No description generated yet."}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section>
        <button
          onClick={() => setShowVersions(!showVersions)}
          className="mb-6 px-4 py-2 rounded-xl flex items-center gap-2 bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 hover:bg-[var(--theme-accent)]/30 transition"
        >
          <History size={16} />
          {showVersions ? "Hide" : "View"} Version History
          {project.versions?.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-[var(--theme-accent)]/20 rounded-full text-xs">
              {project.versions.length}
            </span>
          )}
        </button>

        <AnimatePresence>
          {showVersions && project.versions?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6 overflow-hidden"
            >
              <h3 className="text-lg font-semibold mb-4 text-[var(--theme-accent)] flex items-center gap-2">
                <History className="w-5 h-5" />
                Version History
              </h3>

              <div className="space-y-3">
                {project.versions.map((version, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-black/30 rounded-xl border border-white/5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-gray-400 font-mono">
                        Version {project.versions.length - index}
                      </p>
                      <p className="text-xs text-gray-500">
                        {version.timestamp}
                      </p>
                    </div>

                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {version.idea}
                    </p>

                    <button
                      onClick={async () => {
                        const restoredProject = {
                          ...project,
                          idea: version.idea,
                          sections: normalizeSections(version.sections),
                          blueprint: null,
                          generatedWebsite: "",
                          versions: project.versions,
                        };

                        await saveProjectChanges(restoredProject);
                        setGeneratedCode("");
                        await generateBlueprint(version.idea);
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
      </section>
    </motion.div>
  );
};

export default ProjectDetails;