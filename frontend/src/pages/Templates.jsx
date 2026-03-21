import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Briefcase,
  User,
  Cpu,
  Building,
  X
} from "lucide-react";

const templates = [
  {
    name: "Startup Landing Page",
    desc: "Perfect for SaaS startups and product launches.",
    tag: "SaaS",
    icon: Briefcase
  },
  {
    name: "Portfolio Website",
    desc: "Showcase your work and personal brand.",
    tag: "Personal",
    icon: User
  },
  {
    name: "AI Product Landing",
    desc: "Modern layout for AI tools and platforms.",
    tag: "AI",
    icon: Cpu
  },
  {
    name: "Agency Website",
    desc: "Great for design studios and agencies.",
    tag: "Business",
    icon: Building
  }
];

const Templates = () => {
  const navigate = useNavigate();

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // 👉 open modal
  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setProjectName(template.name); // default name
    setOpenModal(true);
  };

  // 👉 create project
  const createProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
      id: Date.now(),
      name: projectName,
      template: selectedTemplate.name,
      createdAt: new Date().toISOString()
    };

    // save to localStorage
    const existing =
      JSON.parse(localStorage.getItem("projects")) || [];

    localStorage.setItem(
      "projects",
      JSON.stringify([...existing, newProject])
    );

    setOpenModal(false);

    // redirect
    navigate(`/dashboard/projects/${newProject.id}`);
  };

  return (
    <div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles size={20} /> Templates
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Start your project with AI-powered templates.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {templates.map((template, i) => (

          <motion.div
            key={i}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-6 rounded-2xl border border-white/10
                       bg-white/5 backdrop-blur-xl
                       hover:border-purple-500/40
                       transition overflow-hidden"
          >

            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                            bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-xl" />

            {/* Content */}
            <div className="relative z-10">

              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <template.icon size={18} />
                </div>
                <h3 className="text-lg font-medium">
                  {template.name}
                </h3>
              </div>

              <p className="text-sm text-gray-400 mb-4">
                {template.desc}
              </p>

              <span className="text-xs px-2 py-1 rounded-md
                               bg-purple-500/20 text-purple-300">
                {template.tag}
              </span>

              <button
                onClick={() => handleUseTemplate(template)}
                className="mt-5 w-full py-2 rounded-lg text-sm font-medium
                bg-gradient-to-r from-purple-600 to-indigo-600
                hover:from-purple-500 hover:to-indigo-500
                active:scale-[0.98]
                transition-all duration-200
                shadow-lg shadow-purple-500/20"
              >
                Use Template
              </button>

            </div>

          </motion.div>

        ))}

      </div>

      {/* 🔥 MODAL */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          {/* backdrop */}
          <div
            onClick={() => setOpenModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* modal */}
          <div className="relative w-full max-w-md p-6 rounded-2xl
                          bg-[#0f172a] border border-white/10 shadow-xl">

            {/* close */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Create Project
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Using: {selectedTemplate?.name}
            </p>

            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name..."
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10
                         focus:outline-none focus:border-purple-500 text-sm mb-4"
            />

            <button
              onClick={createProject}
              className="w-full py-2 rounded-lg text-sm font-medium
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:opacity-90 transition"
            >
              Create Project
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Templates;