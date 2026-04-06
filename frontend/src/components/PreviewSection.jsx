import { motion } from "framer-motion";
import { Sparkles, Globe, RefreshCw, Maximize2 } from "lucide-react";
import { useState } from "react";

const PreviewSection = ({ onExpand, onRefresh }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-full min-h-[400px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, var(--theme-accent)/0.1, var(--theme-gradient-end)/0.1)`
          }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: 'var(--theme-accent)/0.2' }} />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, var(--theme-accent)/0.2, var(--theme-gradient-end)/0.2)`
            }}>
            <Globe className="w-10 h-10" style={{ color: 'var(--theme-accent)' }} />
          </div>
        </motion.div>

        <h3 className="text-xl font-semibold text-white mb-2">
          Website Preview
        </h3>
        
        <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: 'var(--theme-textSecondary)' }}>
          Your generated website will appear here once you've built it using the AI generator.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm"
            style={{ backgroundColor: 'var(--theme-cardBg)' }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button
            onClick={onExpand}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm hover:shadow-lg transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
              boxShadow: `0 0 20px var(--theme-glow)`
            }}
          >
            <Maximize2 size={14} />
            Expand Preview
          </button>
        </div>

        <div className="absolute -top-4 -right-4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-accent)' }} />
        <div className="absolute -bottom-4 -left-4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-gradient-end)', animationDelay: '1s' }} />
      </div>
    </motion.div>
  );
};

export default PreviewSection;