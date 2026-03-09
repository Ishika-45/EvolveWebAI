import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import SectionCard from "./SectionCard";

const initialSections = [
  "Hero Section",
  "Features Section",
  "Pricing Section",
  "Testimonials",
  "Call To Action",
  "Footer",
];

const WebsiteBlueprint = () => {
  const [sections, setSections] = useState(initialSections);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reordered] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reordered);

    setSections(items);
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

              {sections.map((section, index) => (
                <Draggable
                  key={section}
                  draggableId={section}
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