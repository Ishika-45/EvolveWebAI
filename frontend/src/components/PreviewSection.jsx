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
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
            <Globe className="w-10 h-10 text-purple-400" />
          </div>
        </motion.div>

        <h3 className="text-xl font-semibold text-white mb-2">
          Website Preview
        </h3>
        
        <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
          Your generated website will appear here once you've built it using the AI generator.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-sm"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button
            onClick={onExpand}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm hover:shadow-lg transition-all duration-300"
          >
            <Maximize2 size={14} />
            Expand Preview
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </motion.div>
  );
};

export default PreviewSection;