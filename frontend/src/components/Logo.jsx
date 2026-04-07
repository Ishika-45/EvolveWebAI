// src/components/Logo.jsx
import { motion } from "framer-motion";

const Logo = ({ className = "w-10 h-10", withText = true, collapsed = false }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Animated Premium Logo Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className={`relative ${className}`}
      >
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <svg className="w-full h-full" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="url(#ringGradient)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Main Logo SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
        >
          {/* Background glow */}
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="url(#bgGlow)"
            opacity="0.15"
            className="animate-pulse"
          />
          
          {/* Outer diamond frame */}
          <path
            d="M12 1L1 7L12 13L23 7L12 1Z"
            stroke="url(#gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#diamondFill)"
            fillOpacity="0.1"
          />
          
          {/* Middle diamond */}
          <path
            d="M1 13L12 19L23 13"
            stroke="url(#gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#diamondFill)"
            fillOpacity="0.05"
          />
          
          {/* Inner diamond */}
          <path
            d="M1 8L12 14L23 8"
            stroke="url(#gradient)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          
          {/* Center jewel */}
          <circle
            cx="12"
            cy="8"
            r="2.5"
            fill="url(#centerGradient)"
            className="animate-pulse"
          />
          
          {/* Sparkle rays */}
          <g opacity="0.8">
            <path d="M12 2V4M12 12V14M4 8H6M18 8H20" stroke="url(#gradient)" strokeWidth="1" strokeLinecap="round" />
            <path d="M6 4L7.5 5.5M17.5 10.5L19 12M17.5 5.5L19 4M6 12L7.5 10.5" stroke="url(#gradient)" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          </g>
          
          {/* Orbiting particles */}
          <circle cx="18" cy="5" r="0.8" fill="url(#gradient)" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="19" cy="11" r="0.6" fill="url(#gradient)" className="animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          <circle cx="5" cy="10" r="0.7" fill="url(#gradient)" className="animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--theme-gradient-start)" />
              <stop offset="50%" stopColor="var(--theme-accent)" />
              <stop offset="100%" stopColor="var(--theme-gradient-end)" />
            </linearGradient>
            
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--theme-gradient-start)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--theme-gradient-end)" stopOpacity="0.2" />
            </linearGradient>
            
            <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--theme-gradient-start)" />
              <stop offset="100%" stopColor="var(--theme-gradient-end)" />
            </radialGradient>
            
            <linearGradient id="diamondFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--theme-gradient-start)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--theme-gradient-end)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Premium Text Logo */}
      {withText && !collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[var(--theme-gradient-start)] via-[var(--theme-accent)] to-[var(--theme-gradient-end)] bg-clip-text text-transparent">
              EvolveWeb
            </span>
            <div className="flex items-center gap-1 -mt-1">
              <span className="text-[9px] font-semibold text-gray-500 tracking-wider">AI</span>
              <div className="w-1 h-1 rounded-full bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)]" />
              <span className="text-[9px] font-semibold text-gray-500 tracking-wider">Platform</span>
            </div>
          </div>
          
          {/* Underline accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[var(--theme-gradient-start)] via-[var(--theme-accent)] to-[var(--theme-gradient-end)] rounded-full origin-left"
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Logo;