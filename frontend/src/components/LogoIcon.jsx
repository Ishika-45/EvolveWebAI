// src/components/LogoIcon.jsx
import { motion } from "framer-motion";

const LogoIcon = ({ className = "w-8 h-8" }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className={className}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Diamond Logo */}
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <circle
          cx="12"
          cy="12"
          r="2"
          fill="url(#gradient)"
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-gradient-start)" />
            <stop offset="100%" stopColor="var(--theme-gradient-end)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default LogoIcon;