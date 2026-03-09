import { motion } from "framer-motion";
import { GripVertical, Wand2 } from "lucide-react";

const SectionCard = ({ section }) => {
  return (
    <motion.div
      layout
      className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition"
    >
      <div className="flex items-center gap-3">

        <GripVertical className="text-gray-400" size={18} />

        <p className="text-white text-sm font-medium">
          {section}
        </p>

      </div>

      <button className="flex items-center gap-1 text-indigo-300 text-xs hover:text-indigo-200">
        <Wand2 size={14} />
        AI Edit
      </button>
    </motion.div>
  );
};

export default SectionCard;