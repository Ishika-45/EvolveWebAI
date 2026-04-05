import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Briefcase,
  User,
  Cpu,
  Building,
  X,
  Eye,
  Zap,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import api from "../services/api";

const templates = [
  {
    name: "Startup Landing Page",
    desc: "Perfect for SaaS startups and product launches. Includes hero, features, pricing, and CTA sections.",
    tag: "SaaS",
    icon: Briefcase,
    color: "purple",
    popularity: 98,
    category: "Business",
    features: ["Hero Section", "Features Grid", "Pricing Tables", "Newsletter Signup", "Footer"]
  },
  {
    name: "Portfolio Website",
    desc: "Showcase your work and personal brand with style. Ideal for designers, developers, and artists.",
    tag: "Personal",
    icon: User,
    color: "pink",
    popularity: 95,
    category: "Creative",
    features: ["Hero Banner", "Projects Gallery", "About Section", "Contact Form", "Social Links"]
  },
  {
    name: "AI Product Landing",
    desc: "Modern layout for AI tools and platforms. Perfect for showcasing AI capabilities.",
    tag: "AI",
    icon: Cpu,
    color: "blue",
    popularity: 92,
    category: "Tech",
    features: ["AI Demo Section", "Features Showcase", "Integration List", "Testimonials", "CTA"]
  },
  {
    name: "Agency Website",
    desc: "Great for design studios, agencies, and service providers. Professional and trust-building.",
    tag: "Business",
    icon: Building,
    color: "green",
    popularity: 90,
    category: "Service",
    features: ["Services Grid", "Team Section", "Case Studies", "Client Logos", "Contact"]
  }
];

const Templates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setProjectName(`${template.name} Project`);
    setOpenModal(true);
  };

  const createProject = async () => {
    if (!projectName.trim()) return;
    
    setIsCreating(true);
    
    try {
      // Create project via API
      const res = await api.post("/projects", {
        title: projectName,
        idea: `Template: ${selectedTemplate.name} - ${selectedTemplate.desc}`,
        template: selectedTemplate.name,
        templateData: selectedTemplate
      });
      
      const newProject = res.data?.project || res.data;
      
      setOpenModal(false);
      setIsCreating(false);
      
      // Navigate to project page
      navigate(`/dashboard/project/${newProject._id}`);
    } catch (err) {
      console.error("Failed to create project:", err);
      setIsCreating(false);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: "from-purple-600 to-indigo-600",
      pink: "from-pink-600 to-rose-600",
      blue: "from-blue-600 to-cyan-600",
      green: "from-green-600 to-emerald-600"
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-3">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-purple-300">Template Library</span>
        </div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          Templates
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Choose from professionally designed, AI-powered templates to kickstart your project
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Premium Templates", value: templates.length, icon: Star, color: "purple" },
          { label: "Categories", value: "4+", icon: Sparkles, color: "pink" },
          { label: "Happy Users", value: "10K+", icon: TrendingUp, color: "blue" },
          { label: "AI Ready", value: "100%", icon: Zap, color: "green" }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
          >
            <div className={`p-2 rounded-xl bg-${stat.color}-500/20 w-fit mb-2`}>
              <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {templates.map((template, i) => {
          const isHovered = hoveredTemplate === template.name;
          const TemplateIcon = template.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredTemplate(template.name)}
              onHoverEnd={() => setHoveredTemplate(null)}
              className="group relative cursor-pointer"
            >
              {/* Animated gradient border */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className={`absolute -inset-0.5 bg-gradient-to-r ${getColorClasses(template.color)} rounded-2xl blur-xl transition-all duration-500`}
              />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                {/* Template Preview Area */}
                <div className="relative h-48 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 overflow-hidden">
                  <motion.div
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <TemplateIcon className="w-16 h-16 text-purple-400 mb-3 opacity-50" />
                    <div className="flex gap-1">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
                      >
                        <button
                          onClick={() => handleUseTemplate(template)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                        >
                          <Zap className="w-4 h-4" />
                          Use Template
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Template Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-400">{template.popularity}%</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {template.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full bg-${template.color}-500/10 text-${template.color}-300`}>
                      {template.tag}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                      {template.category}
                    </span>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs text-gray-400">• {feature}</span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{template.features.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                               bg-white/10 hover:bg-white/20 transition-all duration-300
                               text-sm font-medium group/btn"
                  >
                    Use Template
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-6 rounded-2xl
                         bg-gradient-to-br from-gray-900 to-purple-950 
                         border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Create New Project</h2>
                  <p className="text-xs text-gray-400">Using {selectedTemplate?.name} template</p>
                </div>
              </div>

              {/* Template Preview Badge */}
              <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2">
                  {selectedTemplate?.icon && <selectedTemplate.icon className="w-4 h-4 text-purple-400" />}
                  <span className="text-sm text-purple-300">{selectedTemplate?.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">{selectedTemplate?.tag}</span>
                </div>
              </div>

              {/* Project Name Input */}
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10
                           focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                           text-white placeholder-gray-500 transition-all duration-300
                           text-sm mb-4"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && createProject()}
              />

              {/* Features Preview */}
              <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-2">Template includes:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate?.features?.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={createProject}
                  disabled={!projectName.trim() || isCreating}
                  className="flex-1 px-4 py-2 rounded-xl
                             bg-gradient-to-r from-purple-600 to-indigo-600
                             text-white font-medium
                             hover:shadow-lg hover:shadow-purple-500/25
                             transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Project
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Templates;