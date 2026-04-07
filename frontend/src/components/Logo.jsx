// src/components/Logo.jsx
import { motion } from "framer-motion";

const Logo = ({ className = "w-8 h-8", withText = true, collapsed = false }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Animated Logo Icon */}
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`relative ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer glow ring */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
            className="animate-spin-slow"
          />
          
          {/* Inner diamond */}
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
          
          {/* Middle diamond */}
          <path
            d="M2 17L12 22L22 17"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Center diamond */}
          <path
            d="M2 12L12 17L22 12"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
          
          {/* Center dot */}
          <circle
            cx="12"
            cy="12"
            r="2"
            fill="url(#gradient)"
            className="animate-pulse"
          />
          
          {/* Sparkle effects */}
          <path
            d="M12 1V3M12 21V23M23 12H21M3 12H1"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--theme-gradient-start)" />
              <stop offset="100%" stopColor="var(--theme-gradient-end)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Logo Text */}
      {withText && !collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)] bg-clip-text text-transparent">
            EvolveWeb
          </span>
          <span className="text-[10px] text-gray-500 -mt-1">AI Platform</span>
        </motion.div>
      )}
    </div>
  );
};

export default Logo;