import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import SectionCard from "./SectionCard";

const WebsiteBlueprint = ({ sections }) => {
  const [items, setItems] = useState([]);

  // When AI generates sections, update blueprint
  useEffect(() => {
    if (sections && sections.length > 0) {
      setItems(sections);
    }
  }, [sections]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updated = Array.from(items);
    const [reordered] = updated.splice(result.source.index, 1);

    updated.splice(result.destination.index, 0, reordered);

    setItems(updated);
  };

  return (
    <div className="mt-10">

      <h2 className="text-lg font-semibold text-white mb-4">
        AI Generated Website Structure
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">

          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >

              {items.map((section, index) => (
                <Draggable
                  key={section + index}
                  draggableId={section + index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SectionCard section={section} />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}

            </div>
          )}

        </Droppable>
      </DragDropContext>

    </div>
  );
};

export default WebsiteBlueprint;