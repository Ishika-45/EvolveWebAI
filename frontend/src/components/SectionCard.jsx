import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Wand2 } from "lucide-react";

const SectionCard = ({ section }) => {
  const [open, setOpen] = useState(false);

  const mockContent = {
    headline: `Amazing ${section}`,
    description: "AI generated section content will appear here.",
    button: "Get Started"
  };

  return (
    <motion.div
      layout
      className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-lg"
    >
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="text-white font-medium">{section}</h3>

        <ChevronDown
          size={18}
          className={`text-gray-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Expanded Content */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 space-y-3 text-sm"
        >
          <p className="text-gray-300">
            <span className="text-gray-500">Headline:</span>{" "}
            {mockContent.headline}
          </p>

          <p className="text-gray-300">
            <span className="text-gray-500">Description:</span>{" "}
            {mockContent.description}
          </p>

          <p className="text-gray-300">
            <span className="text-gray-500">Button:</span>{" "}
            {mockContent.button}
          </p>

          <div className="flex gap-3 mt-3">
            <button className="flex items-center gap-1 text-indigo-400 text-xs hover:text-indigo-300">
              <Wand2 size={14} />
              AI Regenerate
            </button>

            <button className="text-xs text-gray-400 hover:text-gray-200">
              Edit
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SectionCard;