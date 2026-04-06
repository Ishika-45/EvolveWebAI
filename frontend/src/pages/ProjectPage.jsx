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
        <div className="w-12 h-12 border-3 border-[var(--theme-accent)]/30 border-t-[var(--theme-accent)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-white mb-2">Project Not Found</h2>
        <p className="text-[var(--theme-textSecondary)] mb-6">The project you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="px-6 py-3 rounded-xl text-white transition"
          style={{
            background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
            boxShadow: `0 0 20px var(--theme-glow)`
          }}
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
        className="flex items-center gap-2 text-[var(--theme-textSecondary)] hover:text-white transition-all duration-300 mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </button>

      {/* Project Header */}
      <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-8 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 mb-4">
          <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
          <span className="text-xs text-[var(--theme-accent)]">AI Generated Project</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">{project.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-[var(--theme-textSecondary)]">
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
      <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-white mb-3">Project Idea</h2>
        <p className="text-[var(--theme-textSecondary)] leading-relaxed">
          {project.idea || "No idea description provided."}
        </p>
      </div>

      {/* Template Info (if available) */}
      {project.template && (
        <div className="mt-6 bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-3">Template</h2>
          <p className="text-[var(--theme-accent)]">{project.template}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(`/dashboard/project/${id}/edit`)}
          className="flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
            boxShadow: `0 0 20px var(--theme-glow)`
          }}
        >
          Open in Editor
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectPage;