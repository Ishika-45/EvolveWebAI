import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wand2, Edit3, Copy, Trash2, GripVertical } from "lucide-react";

const SectionCard = ({ section, index, onRegenerate, onEdit, onDelete, onDuplicate }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
      className="group relative rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'var(--theme-cardBg)',
        borderColor: 'var(--theme-borderColor)',
        borderWidth: '1px',
        backdropFilter: 'blur(12px)'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, var(--theme-accent)/0.05, var(--theme-gradient-end)/0.05)`
        }}
      />

      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
        <GripVertical size={16} className="text-gray-500" />
      </div>

      <div className="relative p-4 pl-8">
        <div
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center cursor-pointer group/header"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--theme-accent)/0.2' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--theme-accent)' }}>{index + 1}</span>
            </div>
            <h3 className="text-white font-medium transition-colors group-hover/header:text-[var(--theme-accent)]">
              {sectionTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {isRegenerating && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.4s' }} />
              </div>
            )}
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>

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
                <div className="space-y-3">
                  <div>
                    <label className="text-xs block mb-1" style={{ color: 'var(--theme-textSecondary)' }}>Headline</label>
                    <input
                      type="text"
                      defaultValue={mockContent.headline}
                      className="w-full px-3 py-2 rounded-lg text-white focus:outline-none"
                      style={{
                        backgroundColor: 'var(--theme-cardBg)',
                        borderColor: 'var(--theme-borderColor)',
                        borderWidth: '1px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs block mb-1" style={{ color: 'var(--theme-textSecondary)' }}>Description</label>
                    <textarea
                      defaultValue={mockContent.description}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg text-white focus:outline-none resize-none"
                      style={{
                        backgroundColor: 'var(--theme-cardBg)',
                        borderColor: 'var(--theme-borderColor)',
                        borderWidth: '1px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs block mb-1" style={{ color: 'var(--theme-textSecondary)' }}>Button Text</label>
                    <input
                      type="text"
                      defaultValue={mockContent.button}
                      className="w-full px-3 py-2 rounded-lg text-white focus:outline-none"
                      style={{
                        backgroundColor: 'var(--theme-cardBg)',
                        borderColor: 'var(--theme-borderColor)',
                        borderWidth: '1px'
                      }}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg text-xs transition"
                      style={{
                        backgroundColor: 'var(--theme-success)/0.2',
                        color: 'var(--theme-success)'
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg text-xs transition"
                      style={{
                        backgroundColor: 'var(--theme-cardBg)',
                        color: 'var(--theme-textSecondary)'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span style={{ color: 'var(--theme-textSecondary)' }}>Headline:</span>{" "}
                      <span className="text-white">{mockContent.headline}</span>
                    </p>
                    <p className="text-gray-300">
                      <span style={{ color: 'var(--theme-textSecondary)' }}>Description:</span>{" "}
                      <span className="text-gray-300">{mockContent.description}</span>
                    </p>
                    <p className="text-gray-300">
                      <span style={{ color: 'var(--theme-textSecondary)' }}>Button:</span>{" "}
                      <span style={{ color: 'var(--theme-accent)' }}>{mockContent.button}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t mt-3"
                    style={{ borderColor: 'var(--theme-borderColor)' }}>
                    <button
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-300 disabled:opacity-50"
                      style={{
                        backgroundColor: 'var(--theme-accent)/0.2',
                        color: 'var(--theme-accent)'
                      }}
                    >
                      {isRegenerating ? (
                        <>
                          <div className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: 'var(--theme-accent)' }} />
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--theme-cardBg)',
                        color: 'var(--theme-textSecondary)'
                      }}
                    >
                      <Edit3 size={12} />
                      Edit
                    </button>

                    <button
                      onClick={() => onDuplicate?.(index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--theme-cardBg)',
                        color: 'var(--theme-textSecondary)'
                      }}
                    >
                      <Copy size={12} />
                      Duplicate
                    </button>

                    <button
                      onClick={() => onDelete?.(index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--theme-error)/0.2',
                        color: 'var(--theme-error)'
                      }}
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