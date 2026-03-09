import { motion } from "framer-motion";

const FlowCard = ({ step, index, active }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-4 rounded-xl border
      backdrop-blur-xl
      ${
        active
          ? "bg-indigo-500/10 border-indigo-400/40 shadow-lg shadow-indigo-500/20"
          : "bg-white/5 border-white/10"
      }`}
    >
      <div className="flex items-center gap-3">

        <div
          className={`w-2 h-2 rounded-full ${
            active ? "bg-indigo-400 animate-pulse" : "bg-gray-500"
          }`}
        />

        <p
          className={`text-sm ${
            active ? "text-indigo-300" : "text-gray-400"
          }`}
        >
          {step}
        </p>

      </div>

      {active && (
        <motion.div
          layoutId="flowHighlight"
          className="absolute inset-0 rounded-xl border border-indigo-400/20"
        />
      )}
    </motion.div>
  );
};

export default FlowCard;