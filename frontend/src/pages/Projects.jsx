import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  FolderOpen, 
  Trash2, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Search,
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  X
} from "lucide-react";
import { useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(
        Array.isArray(res.data)
          ? res.data
          : res.data.projects || []
      );
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProject.trim()) return;

    try {
      const res = await api.post("/projects", {
        title: newProject,
        idea: newProject,
      });

      const newProj = res.data?.project || res.data;
      setProjects((prev) => [newProj, ...prev]);
      setNewProject("");
      setShowModal(false);
    } catch (err) {
      console.error("Create failed");
    }
  };

  const deleteProject = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const openProject = (projectId) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => 
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.idea?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "name") {
        return a.title?.localeCompare(b.title);
      }
      if (sortBy === "updated") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return 0;
    });

  const getSortLabel = () => {
    const labels = {
      recent: "Most Recent",
      oldest: "Oldest First",
      name: "A to Z",
      updated: "Last Updated"
    };
    return labels[sortBy] || "Sort by";
  };

  const getProjectStats = (project) => {
    const sectionsCount = project.sections?.length || 0;
    const hasBlueprint = project.blueprint ? true : false;
    const hasWebsite = project.generatedWebsite ? true : false;
    return { sectionsCount, hasBlueprint, hasWebsite };
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("recent");
  };

  const hasActiveFilters = searchTerm !== "";

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 mb-3">
            <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
            <span className="text-xs text-[var(--theme-accent)]">AI Workspace</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage and generate AI-powered websites
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5
                     bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]
                     rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
          style={{ boxShadow: `0 0 20px var(--theme-glow)` }}
        >
          <Plus size={18} />
          New Project
        </motion.button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects by name or idea..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl
                       bg-white/5 border border-white/10
                       focus:outline-none focus:border-[var(--theme-accent)]
                       text-white placeholder-gray-500
                       transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {/* View Toggle */}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid" 
                  ? "bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]" 
                  : "text-gray-500 hover:text-white"
              }`}
              title="Grid View"
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "list" 
                  ? "bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]" 
                  : "text-gray-500 hover:text-white"
              }`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>

          {/* Sort Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                         border transition-all duration-300
                         ${showFilterDropdown 
                           ? "bg-[var(--theme-accent)]/20 border-[var(--theme-accent)]/50 text-[var(--theme-accent)]" 
                           : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                         }`}
            >
              <Filter size={16} />
              <span className="text-sm">{getSortLabel()}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${showFilterDropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl 
                             border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs text-gray-500 border-b border-white/10 mb-2">
                      Sort by
                    </div>
                    
                    {[
                      { value: "recent", label: "Most Recent", icon: "🕐" },
                      { value: "oldest", label: "Oldest First", icon: "📅" },
                      { value: "updated", label: "Last Updated", icon: "🔄" },
                      { value: "name", label: "A to Z", icon: "📝" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300
                          ${sortBy === option.value 
                            ? "bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]" 
                            : "text-gray-400 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        <span>{option.icon}</span>
                        <span className="flex-1 text-left">{option.label}</span>
                        {sortBy === option.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 flex-wrap"
        >
          <span className="text-xs text-gray-500">Active filters:</span>
          
          {searchTerm && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--theme-accent)]/20 border border-[var(--theme-accent)]/30">
              <span className="text-xs text-[var(--theme-accent)]">Search: "{searchTerm}"</span>
              <button
                onClick={() => setSearchTerm("")}
                className="ml-1 text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)]"
              >
                <X size={12} />
              </button>
            </div>
          )}
          
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-[var(--theme-accent)] transition-colors ml-2"
          >
            Clear all
          </button>
        </motion.div>
      )}

      {/* Results Count */}
      {!loading && filteredProjects.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-3 border-[var(--theme-accent)]/30 border-t-[var(--theme-accent)] rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading your projects...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 border border-white/10 rounded-2xl bg-white/5"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[var(--theme-accent)]/20 to-[var(--theme-gradient-end)]/20 flex items-center justify-center">
            <FolderOpen className="text-[var(--theme-accent)]" size={40} />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            {searchTerm ? "No matching projects found" : "No Projects Yet"}
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            {searchTerm 
              ? `No projects match "${searchTerm}". Try a different search term.`
              : "Create your first AI-powered website project and bring your ideas to life"}
          </p>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-6 px-5 py-2.5 bg-white/10 rounded-xl text-white font-medium inline-flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
            >
              <X size={18} />
              Clear Search
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-5 py-2.5 bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)] rounded-xl text-white font-medium inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Create Your First Project
            </button>
          )}
        </motion.div>
      )}

      {/* Project Grid/List View - FULLY CLICKABLE */}
      {!loading && filteredProjects.length > 0 && (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const stats = getProjectStats(project);
              const isHovered = hoveredProject === project._id;

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onHoverStart={() => setHoveredProject(project._id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  onClick={() => openProject(project._id)}
                  className={`group relative cursor-pointer
                    ${viewMode === "grid" 
                      ? "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                      : "bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-4 p-4"
                    }
                    hover:border-[var(--theme-accent)]/50 transition-all duration-300
                    hover:shadow-lg hover:shadow-[var(--theme-accent)]/10`}
                >
                  {/* Animated gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)] rounded-2xl pointer-events-none"
                  />

                  {viewMode === "grid" ? (
                    // Grid View
                    <>
                      <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--theme-accent)]/20 to-[var(--theme-gradient-end)]/20">
                            <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>
                                {project.createdAt 
                                  ? new Date(project.createdAt).toLocaleDateString()
                                  : "Recent"}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(project._id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all duration-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-[var(--theme-accent)] transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {project.idea || "No description yet"}
                        </p>

                        {/* Stats Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {stats.sectionsCount > 0 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                              {stats.sectionsCount} sections
                            </span>
                          )}
                          {stats.hasBlueprint && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300">
                              Blueprint ready
                            </span>
                          )}
                          {stats.hasWebsite && (
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300">
                              Website built
                            </span>
                          )}
                        </div>

                        {/* Open Button */}
                        <div 
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                                     bg-white/10 hover:bg-white/20 transition-all duration-300
                                     text-sm font-medium group/btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProject(project._id);
                          }}
                        >
                          Open Project
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <>
                      <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--theme-accent)]/20 to-[var(--theme-gradient-end)]/20 shrink-0">
                        <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[var(--theme-accent)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-1">
                          {project.idea || "No description yet"}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            {stats.sectionsCount > 0 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                                {stats.sectionsCount} sections
                              </span>
                            )}
                            {stats.hasWebsite && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-300">
                                Live
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            openProject(project._id);
                          }}
                          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-sm cursor-pointer"
                        >
                          Open
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(project._id);
                          }}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all duration-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[400px] p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-purple-950 border border-white/10 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Delete Project?</h3>
                <p className="text-gray-400 text-sm mb-6">
                  This action cannot be undone. All generated content will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(e) => deleteProject(deleteConfirm, e)}
                    className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Project Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[450px] p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-purple-950 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-r from-[var(--theme-accent)]/20 to-[var(--theme-gradient-end)]/20">
                  <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Create New Project</h2>
                  <p className="text-xs text-gray-400">Start your AI journey</p>
                </div>
              </div>

              <input
                type="text"
                placeholder="Enter project name..."
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createProject()}
                className="w-full p-3 rounded-xl
                           bg-white/5 border border-white/10
                           focus:outline-none focus:border-[var(--theme-accent)]
                           text-white placeholder-gray-500
                           transition-all duration-300"
                autoFocus
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={createProject}
                  disabled={!newProject.trim()}
                  className="px-4 py-2 rounded-xl
                             bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]
                             text-white font-medium
                             hover:shadow-lg transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ boxShadow: `0 0 20px var(--theme-glow)` }}
                >
                  Create Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;