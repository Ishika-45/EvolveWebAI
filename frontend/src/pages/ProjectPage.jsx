import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Calendar, FolderOpen } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data?.project || res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-white mb-2">Project Not Found</h2>
        <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/projects")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </button>

      {/* Project Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-purple-300">AI Generated Project</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">{project.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {project.createdAt 
                ? new Date(project.createdAt).toLocaleDateString()
                : "Recently created"}
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span>{project.sections?.length || 0} sections generated</span>
          </div>
        </div>
      </div>

      {/* Project Idea */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-white mb-3">Project Idea</h2>
        <p className="text-gray-300 leading-relaxed">
          {project.idea || "No idea description provided."}
        </p>
      </div>

      {/* Template Info (if available) */}
      {project.template && (
        <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-3">Template</h2>
          <p className="text-purple-400">{project.template}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(`/dashboard/project/${id}/edit`)}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          Open in Editor
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectPage;