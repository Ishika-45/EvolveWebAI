import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowLeft,
  Trash2,
  Pencil,
  Copy,
  Code,
  Check
} from "lucide-react";
import { useLocation } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIdea, setEditedIdea] = useState("");
  const location = useLocation();
  const passedProject = location.state?.project;
  const [viewMode, setViewMode] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [editPulse, setEditPulse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAIComplete, setShowAIComplete] = useState(true);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);
  const [showVersions, setShowVersions] = useState(false);
  const [blueprint, setBlueprint] = useState(project?.blueprint || null);
  const [generatingBlueprint, setGeneratingBlueprint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAIComplete(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!project) return;

    if (project.blueprint) {
      setBlueprint(project.blueprint);
      return;
    }

    generateBlueprint();
  }, [project]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();
        setProject(data);
        setEditedIdea(data.idea || "");
      } catch (error) {
        console.error("Failed to load project", error);
      }
    };

    fetchProject();
  }, [id]);


  if (!project) {
    return (
      <div className="p-10 text-gray-400">
        Project not found.
      </div>
    );
  }

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      const savedProjects =
        JSON.parse(localStorage.getItem("ew_projects")) || [];

      const updatedProjects = savedProjects.filter(
        (p) => String(p.id) !== String(id)
      );

      localStorage.setItem(
        "ew_projects",
        JSON.stringify(updatedProjects)
      );

      navigate("/dashboard");
    }, 500); // animation duration
  };

  const handleRegenerateSection = async (index) => {
    setRegeneratingIndex(index);

    try {
      const response = await fetch("http://localhost:5000/api/ai/generate-section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idea: project.idea,
          sectionTitle: project.sections[index].title
        })
      });

      const data = await response.json();

      const previousVersion = {
        idea: project.idea,
        sections: project.sections,
        timestamp: new Date().toLocaleString()
      };

      const updatedSections = [...project.sections];

      updatedSections[index] = {
        ...updatedSections[index],
        description: data.content
      };

      const updatedProject = {
        ...project,
        sections: updatedSections,
        versions: [...(project.versions || []), previousVersion]
      };

      setProject(updatedProject);

      const savedProjects =
        JSON.parse(localStorage.getItem("ew_projects")) || [];

      const updatedProjects = savedProjects.map((p) =>
        String(p.id) === String(id) ? updatedProject : p
      );

      localStorage.setItem(
        "ew_projects",
        JSON.stringify(updatedProjects)
      );

    } catch (error) {
      console.error("AI Error:", error);
    }

    setRegeneratingIndex(null);
  };

  const generateBlueprint = async () => {
    setGeneratingBlueprint(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/generate-blueprint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idea: project.idea
          })
        }
      );

      const data = await response.json();

      const updatedProject = {
        ...project,
        blueprint: data.blueprint
      };

      setBlueprint(data.blueprint);
      setProject(updatedProject);

      const savedProjects =
        JSON.parse(localStorage.getItem("ew_projects")) || [];

      const updatedProjects = savedProjects.map((p) =>
        String(p.id) === String(id) ? updatedProject : p
      );

      localStorage.setItem(
        "ew_projects",
        JSON.stringify(updatedProjects)
      );

    } catch (error) {
      console.error("Blueprint AI error:", error);
    }

    setGeneratingBlueprint(false);
  };

  const renderPreview = () => {
    if (!blueprint) return null;

    return (
      <div className="space-y-12 mt-8">

        {/* HERO */}
        <div className="text-center py-16 bg-white/5 rounded-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            {blueprint.uniqueSellingProposition}
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6">
          {blueprint.coreFeatures?.map((feature, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-indigo-400 font-semibold mb-2">
                Feature {i + 1}
              </h3>
              <p className="text-gray-400 text-sm">{feature}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to get started?
          </h2>
          <button
            onClick={() => {
              const previewSection = document.getElementById("live-preview");
              if (previewSection) {
                previewSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-6 py-3 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
          >
            Get Started
          </button>
        </div>

      </div>
    );
  };

  const renderLivePreview = () => {
  if (!blueprint) return null;

  return (
    <div
      id="live-preview"
      className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8"
    >
      <h2 className="text-2xl font-semibold mb-6 text-indigo-400">
        Website Preview
      </h2>

      <div className="bg-black rounded-xl overflow-hidden border border-white/10">

        {/* Fake browser header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/60">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <span className="text-xs text-gray-400 ml-4">
            ai-generated-site.vercel.app
          </span>
        </div>

        {/* AI Website */}
        <div className="p-10 space-y-10">

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              {blueprint.uniqueSellingProposition}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blueprint.coreFeatures?.map((feature, i) => (
              <div
                key={i}
                className="p-6 border border-white/10 rounded-xl"
              >
                <h3 className="text-indigo-400 font-semibold mb-2">
                  Feature {i + 1}
                </h3>
                <p className="text-gray-400 text-sm">{feature}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-6 py-3 bg-indigo-500 rounded-xl hover:bg-indigo-600">
              Get Started
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

  const generateCode = () => {
    if (!blueprint) return "// No blueprint yet";

    return `import React from "react";

export default function LandingPage() {
 return (
  <div className="min-h-screen bg-black text-white p-10">

   <section className="text-center mb-20">
     <h1 className="text-4xl font-bold">${project.title}</h1>
     <p className="text-gray-400 mt-4">
       ${blueprint.uniqueSellingProposition}
     </p>
   </section>

   <section className="grid md:grid-cols-3 gap-6 mb-20">
     ${blueprint.coreFeatures
        ?.map(
          (f) => `
     <div className="p-6 border border-white/10 rounded-xl">
       <h3 className="text-indigo-400 font-semibold mb-2">Feature</h3>
       <p>${f}</p>
     </div>`
        )
        .join("")}
   </section>

   <section className="text-center">
     <button className="px-6 py-3 bg-indigo-500 rounded-xl">
       Get Started
     </button>
   </section>

  </div>
 );
}
`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={
        isDeleting
          ? { opacity: 0, scale: 0.9, y: 50 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-10 max-w-6xl mx-auto text-white"
    >
      {/* Back Button */}

      <div className="flex justify-between items-center mb-8 ">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <motion.button
          onClick={handleDelete}
          whileTap={{ scale: 0.9 }}
          animate={isDeleting ? { rotate: 20, scale: 1.1 } : {}}
          className="flex items-center gap-2 px-4 py-2 rounded-xl
             bg-red-500/20 text-red-400
             border border-red-500/30
             hover:bg-red-500/30
             transition-all duration-300"
        >
          <Trash2 size={16} />
          Delete
        </motion.button>
      </div>

      {/* Project Title */}
      <div className=" mb-8">
        <h1 className="text-4xl font-semibold mb-4">
          {project.title}
        </h1>

        <p className="text-gray-400 mb-3">
          Created on {project.date}
        </p>

        {/* AI Generation Status */}
        <AnimatePresence>
          {showAIComplete && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2
                 mt-2 px-4 py-2
                 rounded-xl
                 bg-green-500/10
                 border border-green-500/30
                 text-green-400
                 backdrop-blur-xl
                 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              AI Generation Complete
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Original Idea */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 ">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-indigo-400">
            {project.title ? project.title : "Title to be decided..."}
          </h2>

          <div className="flex items-center gap-3 ">

            {/* EDIT */}
            <motion.button
              onClick={() => {
                setIsEditing(!isEditing);
                setEditPulse(true);
                setTimeout(() => setEditPulse(false), 400);

              }}
              whileTap={{ scale: 0.9 }}
              className={`relative p-2 rounded-lg transition hover:bg-white/10 
      ${isEditing ? "text-indigo-400" : "text-gray-400 hover:text-white"}
    `}
            >
              <Pencil size={18} />

              {editPulse && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-lg bg-indigo-500/30 hover:bg-white/10 transition"
                />
              )}
            </motion.button>

            {/* COPY */}
            <motion.button
              onClick={() => {
                navigator.clipboard.writeText(project.idea);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-gray-400 hover:text-white transition hover:bg-white/10 "
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

            {/* TOGGLE */}
            <motion.div
              layout
              className="relative flex items-center 
             bg-white/5 border border-white/10
             rounded-xl p-1 text-sm cursor-pointer
             backdrop-blur-xl "
            >

              {/* Animated Active Background */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`absolute top-1 bottom-1 w-1/2 rounded-lg
      ${viewMode === "preview"
                    ? "left-1 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "right-1 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  }`}
              />

              {/* Preview */}
              <div
                onClick={() => setViewMode("preview")}
                className={`relative z-10 px-4 py-1.5 transition
      ${viewMode === "preview"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                  }`}
              >
                Preview
              </div>

              {/* Code */}
              <div
                onClick={() => setViewMode("code")}
                className={`relative z-10 px-4 py-1.5 transition
      ${viewMode === "code"
                    ? "text-indigo-400"
                    : "text-gray-400 hover:text-gray-200"
                  }`}
              >
                Code
              </div>

            </motion.div>

          </div>
        </div>

        {isEditing ? (
          <textarea
            value={editedIdea}
            onChange={(e) => setEditedIdea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                // Trigger same save logic
                const previousVersion = {
                  idea: project.idea,
                  sections: project.sections,
                  timestamp: new Date().toLocaleString()
                };

                const updatedProject = {
                  ...project,
                  idea: editedIdea,
                  versions: [...(project.versions || []), previousVersion]
                };

                setProject(updatedProject);

                const savedProjects =
                  JSON.parse(localStorage.getItem("ew_projects")) || [];

                const updatedProjects = savedProjects.map((p) =>
                  String(p.id) === String(id) ? updatedProject : p
                );

                localStorage.setItem(
                  "ew_projects",
                  JSON.stringify(updatedProjects)
                );

                setIsEditing(false);
              }
            }}
            className="w-full bg-transparent border border-white/10 rounded-xl p-4 text-gray-200"
          />
        ) : viewMode === "preview" ? (
          renderPreview()
        ) : (
          <pre className="text-green-400 text-sm whitespace-pre-wrap bg-black/30 p-4 rounded-xl overflow-x-auto">
            {generateCode()}
          </pre>
        )}

        {isEditing && (
          <button
            onClick={() => {
              // 1️⃣ Save previous version before editing
              const previousVersion = {
                idea: project.idea,
                sections: project.sections,
                timestamp: new Date().toLocaleString()
              };

              const updatedProject = {
                ...project,
                idea: editedIdea,
                versions: [...(project.versions || []), previousVersion]
              };

              // 2️⃣ Update state
              setProject(updatedProject);

              // 3️⃣ Update localStorage
              const savedProjects =
                JSON.parse(localStorage.getItem("ew_projects")) || [];

              const updatedProjects = savedProjects.map((p) =>
                String(p.id) === String(id) ? updatedProject : p
              );

              localStorage.setItem(
                "ew_projects",
                JSON.stringify(updatedProjects)
              );

              setIsEditing(false);
            }}
            className="mt-4 px-4 py-2 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
          >
            Save Changes
          </button>
        )}
      </div>

      <button
        onClick={() => setShowVersions(!showVersions)}
        className="mb-6 px-4 py-2 rounded-xl
             bg-indigo-500/20 text-indigo-400
             hover:bg-indigo-500/30 transition"
      >
        View Version History
      </button>

      {showVersions && project.versions?.length > 0 && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-400">
            Version History
          </h3>

          {project.versions.map((version, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-black/30 rounded-xl"
            >
              <p className="text-xs text-gray-400 mb-2">
                Saved on {version.timestamp}
              </p>

              <button
                onClick={() => {
                  const restoredProject = {
                    ...project,
                    idea: version.idea,
                    sections: version.sections,
                    versions: project.versions
                  };

                  setProject(restoredProject);

                  const savedProjects =
                    JSON.parse(localStorage.getItem("ew_projects")) || [];

                  const updatedProjects = savedProjects.map((p) =>
                    String(p.id) === String(id) ? restoredProject : p
                  );

                  localStorage.setItem(
                    "ew_projects",
                    JSON.stringify(updatedProjects)
                  );
                }}
                className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition"
              >
                Restore This Version
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AI Startup Blueprint */}

      <div className="mt-10 mb-10">

        <h2 className="text-2xl font-semibold mb-6 text-indigo-400">
          AI Startup Blueprint
        </h2>

        {generatingBlueprint ? (

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-400">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
              AI is analyzing your idea...
            </motion.div>

            <p className="text-sm mt-3 text-gray-500">
              Identifying problem, audience, and solution...
            </p>

          </div>

        ) : blueprint && (

          <div className="grid md:grid-cols-2 gap-6">

            {
              [
                { title: "Problem", content: blueprint.problem },
                { title: "Target Audience", content: blueprint.targetAudience },
                { title: "Solution", content: blueprint.uniqueSellingProposition },
                { title: "Business Model", content: blueprint.monetizationStrategy },
                { title: "Core Features", content: blueprint.coreFeatures?.join(", ") }
              ]
                .map((item, index) => (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl
border border-white/10
rounded-2xl p-6
hover:bg-white/10
transition"
                  >

                    <h3 className="text-lg font-semibold text-indigo-400 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.content}
                    </p>

                  </motion.div>

                ))}

          </div>

        )}

      </div>

      {/* Generated Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {project.sections?.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/5 backdrop-blur-xl
           border border-white/10
           rounded-2xl p-6
           hover:bg-white/10
           transition
           ${regeneratingIndex === index ? "ring-1 ring-indigo-400/40" : ""}`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-purple-400">
                {section.title}
              </h3>

              <button
                onClick={() => handleRegenerateSection(index)}
                className="text-xs px-3 py-1 rounded-lg
               bg-indigo-500/20 text-indigo-400
               hover:bg-indigo-500/30 transition"
              >
                Regenerate
              </button>
            </div>
            {regeneratingIndex === index ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 text-sm flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                AI is improving this section...
              </motion.div>
            ) : (
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                {section.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
      {renderLivePreview()}
    </motion.div>
  );
};

export default ProjectDetails;