import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wand2, Edit3, Copy, Trash2, GripVertical, CheckCircle } from "lucide-react";

const SectionCard = ({ section, index, onRegenerate, onEdit, onDelete, onDuplicate }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({});
  const [isRegenerating, setIsRegenerating] = useState(false);

  const mockContent = {
    headline: `Amazing ${typeof section === 'string' ? section : section.title || section}`,
    description: "AI generated section content will appear here. You can edit this content or regenerate it using AI.",
    button: "Get Started",
    cta: "Learn More"
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    if (onRegenerate) await onRegenerate(index);
    setTimeout(() => setIsRegenerating(false), 1500);
  };

  const sectionTitle = typeof section === 'string' ? section : section.title || section;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300"
    >
      {/* Gradient hover effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-indigo-600/5"
      />

      {/* Drag Handle */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
        <GripVertical size={16} className="text-gray-500" />
      </div>

      <div className="relative p-4 pl-8">
        {/* Header */}
        <div
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center cursor-pointer group/header"
        >
          <div className="flex items-center gap-3">
            {/* Index badge */}
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span className="text-xs text-purple-400 font-mono">{index + 1}</span>
            </div>
            <h3 className="text-white font-medium group-hover/header:text-purple-400 transition-colors">
              {sectionTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Status indicator */}
            {isRegenerating && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3 text-sm"
            >
              {isEditing ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Headline</label>
                    <input
                      type="text"
                      defaultValue={mockContent.headline}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Description</label>
                    <textarea
                      defaultValue={mockContent.description}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Button Text</label>
                    <input
                      type="text"
                      defaultValue={mockContent.button}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-gray-400 text-xs hover:bg-white/20 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="text-gray-500">Headline:</span>{" "}
                      <span className="text-white">{mockContent.headline}</span>
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-500">Description:</span>{" "}
                      <span className="text-gray-300">{mockContent.description}</span>
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-500">Button:</span>{" "}
                      <span className="text-purple-400">{mockContent.button}</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10 mt-3">
                    <button
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs hover:bg-purple-500/30 transition-all duration-300 disabled:opacity-50"
                    >
                      {isRegenerating ? (
                        <>
                          <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <Wand2 size={12} />
                          AI Regenerate
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-gray-400 text-xs hover:bg-white/20 hover:text-white transition-all duration-300"
                    >
                      <Edit3 size={12} />
                      Edit
                    </button>

                    <button
                      onClick={() => onDuplicate?.(index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-gray-400 text-xs hover:bg-white/20 hover:text-white transition-all duration-300"
                    >
                      <Copy size={12} />
                      Duplicate
                    </button>

                    <button
                      onClick={() => onDelete?.(index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SectionCard;