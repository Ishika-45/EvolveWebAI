import { motion } from "framer-motion";
import { useRef, useState } from "react";

const FlowCard = ({ step, index, active }) => {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative p-[1px] rounded-xl overflow-hidden"
    >

      {/* Animated gradient border */}
      {active && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(120deg, rgba(99,102,241,0.6), rgba(168,85,247,0.6), rgba(99,102,241,0.6))"
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Card content wrapper */}
      <div
        className={`relative rounded-xl p-4 backdrop-blur-xl border
        ${
          active
            ? "bg-indigo-500/10 border-indigo-400/40 shadow-lg shadow-indigo-500/20"
            : "bg-white/5 border-white/10"
        }`}
      >

        {/* Cursor glow */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition pointer-events-none"
          style={{
            background: `radial-gradient(
              200px at ${pos.x}px ${pos.y}px,
              rgba(99,102,241,0.25),
              transparent 70%
            )`
          }}
        />

        <div className="relative z-10 flex items-center gap-3">

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

      </div>

    </motion.div>
  );
};

export default FlowCard;