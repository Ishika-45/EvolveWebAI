// src/components/LogoIcon.jsx
import { motion } from "framer-motion";

const LogoIcon = ({ className = "w-8 h-8" }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`relative ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Premium Icon */}
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-gradient-start)" />
            <stop offset="100%" stopColor="var(--theme-gradient-end)" />
          </linearGradient>
          
          <radialGradient id="iconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Glow behind icon */}
        <circle cx="12" cy="12" r="10" fill="url(#iconGlow)" className="animate-pulse" />
        
        {/* Main diamond */}
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="url(#iconGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#iconGrad)"
          fillOpacity="0.1"
        />
        
        {/* Middle diamond */}
        <path
          d="M2 17L12 22L22 17"
          stroke="url(#iconGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Inner diamond */}
        <path
          d="M2 12L12 17L22 12"
          stroke="url(#iconGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        
        {/* Center jewel */}
        <circle
          cx="12"
          cy="7"
          r="2"
          fill="url(#iconGrad)"
          className="animate-pulse"
        />
        
        {/* Decorative dots */}
        <circle cx="12" cy="19" r="1" fill="url(#iconGrad)" opacity="0.5" />
        <circle cx="6" cy="11" r="0.8" fill="url(#iconGrad)" opacity="0.4" />
        <circle cx="18" cy="11" r="0.8" fill="url(#iconGrad)" opacity="0.4" />
      </svg>
    </motion.div>
  );
};

export default LogoIcon;