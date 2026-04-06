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

  const getStepIcon = () => {
    if (completed) return <CheckCircle className="w-4 h-4" style={{ color: 'var(--theme-success)' }} />;
    if (active) return <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--theme-accent)' }} />;
    return <div className="w-2 h-2 rounded-full bg-gray-500" />;
  };

  const getStatus = () => {
    if (completed) return { text: "Completed", color: 'var(--theme-success)', bg: 'var(--theme-success)/0.2' };
    if (active) return { text: "In Progress", color: 'var(--theme-accent)', bg: 'var(--theme-accent)/0.2' };
    return { text: "Pending", color: 'var(--theme-textSecondary)', bg: 'var(--theme-textSecondary)/0.1' };
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
      <AnimatePresence>
        {(active || isHovered) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl"
            style={{
              background: active
                ? `linear-gradient(120deg, var(--theme-accent) 0.5, var(--theme-gradient-end) 0.5, var(--theme-accent) 0.5)`
                : `linear-gradient(120deg, var(--theme-accent) 0.2, var(--theme-gradient-end) 0.2, var(--theme-accent) 0.2)`
            }}
          >
            {active && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)"
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative rounded-xl p-4 backdrop-blur-xl border transition-all duration-300
        ${
          active
            ? "shadow-lg"
            : completed
            ? ""
            : "hover:bg-white/10"
        }`}
        style={{
          backgroundColor: active ? 'var(--theme-accent)/0.1' : completed ? 'var(--theme-success)/0.1' : 'var(--theme-cardBg)',
          borderColor: active ? 'var(--theme-accent)/0.4' : completed ? 'var(--theme-success)/0.3' : 'var(--theme-borderColor)',
          boxShadow: active ? `0 0 20px var(--theme-glow)` : 'none'
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(
              200px at ${pos.x}px ${pos.y}px,
              ${active ? 'var(--theme-accent)/0.3' : 'var(--theme-accent)/0.2'},
              transparent 70%
            )`
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {getStepIcon()}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium transition-colors duration-300
                  ${active ? "" : completed ? "" : "group-hover:text-gray-300"}`}
                  style={{
                    color: active ? 'var(--theme-accent)' : completed ? 'var(--theme-success)' : 'var(--theme-textSecondary)'
                  }}>
                  {step}
                </p>
                
                <span className="text-[10px] px-2 py-0.5 rounded-full ml-2"
                  style={{
                    backgroundColor: status.bg,
                    color: status.color
                  }}>
                  {status.text}
                </span>
              </div>
              
              {active && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.15s' }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            {(active || completed) && (
              <div className="flex-shrink-0">
                {active ? (
                  <Zap className="w-3 h-3 animate-pulse" style={{ color: 'var(--theme-accent)' }} />
                ) : completed ? (
                  <Sparkles className="w-3 h-3" style={{ color: 'var(--theme-success)' }} />
                ) : null}
              </div>
            )}
          </div>

          {step.description && (
            <p className={`text-xs mt-2 pl-6 ${active ? "" : "text-gray-500"}`}
              style={active ? { color: 'var(--theme-accent)/0.7' } : {}}>
              {step.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FlowCard;