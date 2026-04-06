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
      const res = await api.post("/projects", {
        title: projectName,
        idea: `Template: ${selectedTemplate.name} - ${selectedTemplate.desc}`,
        template: selectedTemplate.name,
        templateData: selectedTemplate
      });
      
      const newProject = res.data?.project || res.data;
      
      setOpenModal(false);
      setIsCreating(false);
      
      navigate(`/dashboard/project/${newProject._id}`);
    } catch (err) {
      console.error("Failed to create project:", err);
      setIsCreating(false);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: "from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]",
      pink: "from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]",
      blue: "from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]",
      green: "from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]"
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 mb-3">
          <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
          <span className="text-xs text-[var(--theme-accent)]">Template Library</span>
        </div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          Templates
        </h1>
        <p className="text-[var(--theme-textSecondary)] text-sm mt-1">
          Choose from professionally designed, AI-powered templates to kickstart your project
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Premium Templates", value: templates.length, icon: Star },
          { label: "Categories", value: "4+", icon: Sparkles },
          { label: "Happy Users", value: "10K+", icon: TrendingUp },
          { label: "AI Ready", value: "100%", icon: Zap }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-4"
          >
            <div className="p-2 rounded-xl bg-[var(--theme-accent)]/20 w-fit mb-2">
              <stat.icon className="w-4 h-4 text-[var(--theme-accent)]" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-[var(--theme-textSecondary)]">{stat.label}</p>
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
                className="absolute -inset-0.5 rounded-2xl blur-xl transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                }}
              />
              
              <div className="relative bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl overflow-hidden hover:border-[var(--theme-accent)]/50 transition-all duration-300">
                {/* Template Preview Area */}
                <div className="relative h-48 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-accent)/10, var(--theme-gradient-end)/10)`
                  }}
                >
                  <motion.div
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <TemplateIcon className="w-16 h-16 text-[var(--theme-accent)] mb-3 opacity-50" />
                    <div className="flex gap-1">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]/50" />
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
                          className="px-4 py-2 rounded-lg text-white text-sm flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
                            boxShadow: `0 0 20px var(--theme-glow)`
                          }}
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
                    <h3 className="text-lg font-semibold text-white group-hover:text-[var(--theme-accent)] transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-400">{template.popularity}%</span>
                    </div>
                  </div>
                  
                  <p className="text-[var(--theme-textSecondary)] text-sm mb-3 line-clamp-2">
                    {template.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                      {template.tag}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                      {template.category}
                    </span>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-4">
                    <p className="text-xs text-[var(--theme-textSecondary)] mb-2">Includes:</p>
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
                               text-sm font-medium group/btn text-white"
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
              className="relative w-full max-w-md p-6 rounded-2xl bg-[var(--theme-cardBg)] border border-[var(--theme-borderColor)] shadow-2xl"
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
                <div className="p-2 rounded-xl bg-[var(--theme-accent)]/20">
                  <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Create New Project</h2>
                  <p className="text-xs text-[var(--theme-textSecondary)]">Using {selectedTemplate?.name} template</p>
                </div>
              </div>

              {/* Template Preview Badge */}
              <div className="mb-4 p-3 rounded-xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                <div className="flex items-center gap-2">
                  {selectedTemplate?.icon && <selectedTemplate.icon className="w-4 h-4 text-[var(--theme-accent)]" />}
                  <span className="text-sm text-[var(--theme-accent)]">{selectedTemplate?.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">{selectedTemplate?.tag}</span>
                </div>
              </div>

              {/* Project Name Input */}
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="w-full p-3 rounded-xl bg-white/5 border border-[var(--theme-borderColor)]
                           focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20
                           text-white placeholder-gray-500 transition-all duration-300
                           text-sm mb-4"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && createProject()}
              />

              {/* Features Preview */}
              <div className="mb-6 p-3 rounded-xl bg-white/5 border border-[var(--theme-borderColor)]">
                <p className="text-xs text-[var(--theme-textSecondary)] mb-2">Template includes:</p>
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
                  className="flex-1 px-4 py-2 rounded-xl text-white font-medium
                             transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
                    boxShadow: `0 0 20px var(--theme-glow)`
                  }}
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