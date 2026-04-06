import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { 
  Layers, 
  Sparkles, 
  AlertCircle, 
  CheckCircle,
  ArrowUpDown,
  RefreshCw
} from "lucide-react";
import SectionCard from "./SectionCard";

const WebsiteBlueprint = ({ sections, onReorder, onRegenerateSection, isLoading }) => {
  const [items, setItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (sections && sections.length > 0) {
      setItems(sections);
    }
  }, [sections]);

  const handleDragEnd = (result) => {
    setIsDragging(false);
    if (!result.destination) return;

    const updated = Array.from(items);
    const [reordered] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, reordered);

    setItems(updated);
    if (onReorder) onReorder(updated);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleRegenerateAll = async () => {
    for (let i = 0; i < items.length; i++) {
      if (onRegenerateSection) await onRegenerateSection(i);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--theme-accent)/0.2' }}>
              <Layers className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
            </div>
            <h2 className="text-lg font-semibold text-white">
              AI Generated Website Structure
            </h2>
            {items.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)/0.2', color: 'var(--theme-accent)' }}>
                {items.length} sections
              </span>
            )}
          </div>
          <p className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
            Drag and drop to reorder sections. Each section can be customized or regenerated.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleRegenerateAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300"
            style={{ backgroundColor: 'var(--theme-cardBg)' }}
          >
            <RefreshCw size={14} />
            Regenerate All
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 rounded-2xl"
          style={{ backgroundColor: 'var(--theme-cardBg)', borderColor: 'var(--theme-borderColor)', borderWidth: '1px' }}>
          <div className="w-10 h-10 border-3 rounded-full animate-spin mb-3"
            style={{ borderColor: 'var(--theme-accent)/0.3', borderTopColor: 'var(--theme-accent)' }} />
          <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>Generating website structure...</p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-textSecondary)' }}>AI is analyzing your requirements</p>
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed"
          style={{ backgroundColor: 'var(--theme-cardBg)', borderColor: 'var(--theme-borderColor)' }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--theme-accent)/0.2' }}>
            <AlertCircle className="w-8 h-8" style={{ color: 'var(--theme-accent)' }} />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Sections Generated</h3>
          <p className="text-sm text-center max-w-md" style={{ color: 'var(--theme-textSecondary)' }}>
            Describe your website idea in the AI generator above to create a structured blueprint.
          </p>
        </motion.div>
      )}

      {items.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <Droppable droppableId="sections">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-3 transition-all duration-300 rounded-2xl p-2 ${
                  snapshot.isDraggingOver ? "bg-purple-500/5" : ""
                }`}
              >
                <AnimatePresence>
                  {items.map((section, index) => (
                    <Draggable
                      key={`${typeof section === 'string' ? section : section.id || section.title}-${index}`}
                      draggableId={`section-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-all duration-200 ${snapshot.isDragging ? "opacity-50" : ""}`}
                        >
                          <SectionCard
                            section={section}
                            index={index}
                            onRegenerate={onRegenerateSection}
                            onDelete={(idx) => {
                              const updated = items.filter((_, i) => i !== idx);
                              setItems(updated);
                              if (onReorder) onReorder(updated);
                            }}
                            onDuplicate={(idx) => {
                              const sectionToDuplicate = items[idx];
                              const updated = [...items];
                              updated.splice(idx + 1, 0, { ...sectionToDuplicate, id: Date.now() });
                              setItems(updated);
                              if (onReorder) onReorder(updated);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {items.length > 1 && !isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center justify-center gap-2 text-xs"
          style={{ color: 'var(--theme-textSecondary)' }}
        >
          <ArrowUpDown size={12} />
          <span>Drag the dots (⋮⋮) to reorder sections</span>
        </motion.div>
      )}

      {items.length > 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-lg w-fit mx-auto"
          style={{ backgroundColor: 'var(--theme-success)/0.1', color: 'var(--theme-success)' }}
        >
          <CheckCircle size={12} />
          <span>Website structure ready! You can now generate the full website.</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WebsiteBlueprint;