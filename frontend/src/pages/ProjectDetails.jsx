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

  useEffect(() => {
  if (passedProject) {
    setProject(passedProject);
    setEditedIdea(passedProject.idea || "");
  } else {
    const savedProjects =
      JSON.parse(localStorage.getItem("ew_projects")) || [];

    const foundProject = savedProjects.find(
      (p) => p.id === id
    );

    setProject(foundProject);
    if (foundProject) {
      setEditedIdea(foundProject.idea || "");
    }
  }
}, [id, passedProject]);
 

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
  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={
    isDeleting
      ? { opacity: 0, scale: 0.9, y: 50 }
      : { opacity: 1, scale: 1, y: 0 }
  }
  transition={{ duration: 0.5 }}
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
      <h1 className="text-4xl font-semibold mb-4">
        {project.title}
      </h1>

      <p className="text-gray-400 mb-10">
        Created on {project.date}
      </p>

      {/* Original Idea */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-lg font-medium text-indigo-400">
      Original Idea
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
    className="w-full bg-transparent border border-white/10 rounded-xl p-4 text-gray-200"
  />
) : viewMode === "preview" ? (
  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
    {project.idea}
  </p>
) : (
  <pre className="text-green-400 text-sm whitespace-pre-wrap bg-black/30 p-4 rounded-xl overflow-x-auto">
{`{
  "title": "${project.title}",
  "idea": "${project.idea}"
}`}
  </pre>
)}

  {isEditing && (
    <button
      onClick={() => {
        const savedProjects =
          JSON.parse(localStorage.getItem("ew_projects")) || [];

        const updatedProjects = savedProjects.map((p) =>
          p.id === id ? { ...p, idea: editedIdea } : p
        );

        localStorage.setItem(
          "ew_projects",
          JSON.stringify(updatedProjects)
        );

        setProject({ ...project, idea: editedIdea });
        setIsEditing(false);
      }}
      className="mt-4 px-4 py-2 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
    >
      Save Changes
    </button>
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
            className="bg-white/5 backdrop-blur-xl
                       border border-white/10
                       rounded-2xl p-6
                       hover:bg-white/10
                       transition"
          >
            <h3 className="text-lg font-semibold mb-3 text-purple-400">
              {section.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {section.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectDetails;