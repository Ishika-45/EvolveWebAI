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

  // When AI generates sections, update blueprint
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
    // Trigger regeneration for all sections
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20">
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              AI Generated Website Structure
            </h2>
            {items.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                {items.length} sections
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Drag and drop to reorder sections. Each section can be customized or regenerated.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleRegenerateAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-gray-300 hover:text-white transition-all duration-300"
          >
            <RefreshCw size={14} />
            Regenerate All
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <div className="w-10 h-10 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-3" />
          <p className="text-sm text-gray-400">Generating website structure...</p>
          <p className="text-xs text-gray-500 mt-1">AI is analyzing your requirements</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 bg-white/5 rounded-2xl border border-white/10 border-dashed"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Sections Generated</h3>
          <p className="text-sm text-gray-400 text-center max-w-md">
            Describe your website idea in the AI generator above to create a structured blueprint.
          </p>
        </motion.div>
      )}

      {/* Sections List with Drag and Drop */}
      {items.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <Droppable droppableId="sections">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-3 transition-all duration-300 ${
                  snapshot.isDraggingOver ? "bg-purple-500/5 rounded-2xl p-2" : ""
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
                          className={`transition-all duration-200 ${
                            snapshot.isDragging ? "opacity-50" : ""
                          }`}
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

      {/* Drag Hint */}
      {items.length > 1 && !isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500"
        >
          <ArrowUpDown size={12} />
          <span>Drag the dots (⋮⋮) to reorder sections</span>
        </motion.div>
      )}

      {/* Completion Badge */}
      {items.length > 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-2 rounded-lg w-fit mx-auto"
        >
          <CheckCircle size={12} />
          <span>Website structure ready! You can now generate the full website.</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WebsiteBlueprint;