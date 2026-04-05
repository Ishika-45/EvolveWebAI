import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle, Loader2, Zap, Sparkles } from "lucide-react";

const FlowCard = ({ step, index, active, completed = false }) => {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Get step icon based on status
  const getStepIcon = () => {
    if (completed) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (active) return <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />;
    return <div className="w-2 h-2 rounded-full bg-gray-500" />;
  };

  // Get status text and color
  const getStatus = () => {
    if (completed) return { text: "Completed", color: "text-green-400", bg: "bg-green-500/20" };
    if (active) return { text: "In Progress", color: "text-purple-400", bg: "bg-purple-500/20" };
    return { text: "Pending", color: "text-gray-500", bg: "bg-gray-500/10" };
  };

  const status = getStatus();

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative p-[1px] rounded-xl overflow-hidden group"
    >
      {/* Animated gradient border */}
      <AnimatePresence>
        {(active || isHovered) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl"
            style={{
              background: active
                ? "linear-gradient(120deg, rgba(99,102,241,0.8), rgba(168,85,247,0.8), rgba(99,102,241,0.8))"
                : "linear-gradient(120deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3), rgba(99,102,241,0.3))"
            }}
          >
            {active && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)"
                }}
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card content wrapper */}
      <div
        className={`relative rounded-xl p-4 backdrop-blur-xl border transition-all duration-300
        ${
          active
            ? "bg-purple-500/10 border-purple-400/40 shadow-lg shadow-purple-500/20"
            : completed
            ? "bg-green-500/10 border-green-400/30"
            : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
      >
        {/* Cursor glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(
              200px at ${pos.x}px ${pos.y}px,
              ${active ? 'rgba(99,102,241,0.3)' : 'rgba(139,92,246,0.2)'},
              transparent 70%
            )`
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            {/* Status Icon */}
            <div className="flex-shrink-0">
              {getStepIcon()}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-medium transition-colors duration-300
                  ${active ? "text-purple-300" : completed ? "text-green-300" : "text-gray-400 group-hover:text-gray-300"}`}
                >
                  {step}
                </p>
                
                {/* Status Badge */}
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.bg} ${status.color} ml-2`}>
                  {status.text}
                </span>
              </div>
              
              {/* Progress indicator for active step */}
              {active && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Icon decoration */}
            {(active || completed) && (
              <div className="flex-shrink-0">
                {active ? (
                  <Zap className="w-3 h-3 text-purple-400 animate-pulse" />
                ) : completed ? (
                  <Sparkles className="w-3 h-3 text-green-400" />
                ) : null}
              </div>
            )}
          </div>

          {/* Optional: Step description (if provided) */}
          {step.description && (
            <p className={`text-xs mt-2 pl-6 ${active ? "text-purple-300/70" : "text-gray-500"}`}>
              {step.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FlowCard;