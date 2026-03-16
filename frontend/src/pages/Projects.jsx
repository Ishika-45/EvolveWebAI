import { useState } from "react";
import { Plus, FolderOpen, Trash2 } from "lucide-react";

const Projects = () => {

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI Startup Landing Page",
      description: "Landing page for an AI SaaS product",
    },
    {
      id: 2,
      title: "E-commerce Builder",
      description: "AI generated ecommerce website",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState("");

  const createProject = () => {
    if (!newProject.trim()) return;

    const project = {
      id: Date.now(),
      title: newProject,
      description: "AI generated project",
    };

    setProjects([...projects, project]);
    setNewProject("");
    setShowModal(false);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-gray-400 text-sm">
            Manage and generate AI websites
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5
                     bg-gradient-to-r from-purple-500 to-indigo-500
                     rounded-xl hover:opacity-90 transition"
        >
          <Plus size={18} />
          New Project
        </button>

      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-20 border border-white/10 rounded-xl bg-white/5">
          <FolderOpen className="mx-auto mb-4 text-gray-400" size={40} />
          <h3 className="text-lg font-medium">No Projects Yet</h3>
          <p className="text-gray-400 text-sm mt-1">
            Create your first AI website project
          </p>
        </div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative p-6 rounded-2xl
                       bg-white/5 backdrop-blur-xl
                       border border-white/10
                       hover:border-purple-400/40
                       transition-all duration-300
                       hover:shadow-lg hover:shadow-purple-500/10"
          >

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0
                            group-hover:opacity-100 transition
                            bg-gradient-to-r from-purple-500/10 to-indigo-500/10" />

            <div className="relative z-10">

              <h3 className="text-lg font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                {project.description}
              </p>

              <div className="flex justify-between items-center">

                <button
                  className="text-sm px-4 py-2 rounded-lg
                             bg-white/10 hover:bg-white/20 transition"
                >
                  Open Project
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center
                        bg-black/50 backdrop-blur-sm z-50">

          <div className="w-[420px] p-6 rounded-2xl
                          bg-[#0f172a] border border-white/10">

            <h2 className="text-lg font-semibold mb-4">
              Create New Project
            </h2>

            <input
              type="text"
              placeholder="Enter project name..."
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              className="w-full p-3 rounded-lg
                         bg-white/5 border border-white/10
                         focus:outline-none focus:border-purple-500"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                onClick={createProject}
                className="px-4 py-2 rounded-lg
                           bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                Create
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Projects;