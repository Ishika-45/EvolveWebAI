import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("ew_projects")) || [];
    const foundProject = savedProjects.find((p) => p.id === id);
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <div className="p-10 text-gray-400">
        Project not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-10 max-w-6xl mx-auto text-white"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Project Title */}
      <h1 className="text-4xl font-semibold mb-4">
        {project.title}
      </h1>

      <p className="text-gray-400 mb-10">
        Created on {project.date}
      </p>

      {/* Original Idea */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-medium mb-3 text-indigo-400">
          Original Idea
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {project.idea}
        </p>
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