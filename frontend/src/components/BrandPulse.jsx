import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const BrandPulse = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  useEffect(() => {
    // Continuous pulse animation
    const pulseSequence = async () => {
      while (true) {
        await controls.start({
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          transition: { duration: 2, repeat: Infinity }
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };
    pulseSequence();
  }, [controls]);

  const handleClick = () => {
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 1000);
  };

  return (
    <div className="flex justify-center mb-8">
      <motion.div 
        className="relative flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        {/* Multiple Glow Layers */}
        <motion.span
          animate={controls}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-20 blur-2xl"
        />
        
        {/* Outer soft glow */}
        <motion.span
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.3 : 0.2,
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-24 h-24 rounded-full bg-purple-500 opacity-20 blur-xl"
        />

        {/* Middle subtle ring */}
        <motion.span
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute w-20 h-20 rounded-full border-2 border-purple-400 opacity-40"
        />

        {/* Inner ring with animation */}
        <motion.span
          animate={{
            scale: isHovered ? 1.05 : 1,
            borderColor: isHovered ? "#a78bfa" : "#8b5cf6",
          }}
          className="absolute w-14 h-14 rounded-full border border-purple-400 opacity-60"
        />

        {/* Ripple Effect on Click */}
        {rippleActive && (
          <>
            <motion.span
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute w-14 h-14 rounded-full bg-purple-500"
            />
            <motion.span
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="absolute w-14 h-14 rounded-full bg-purple-400"
            />
          </>
        )}

        {/* Core energy dot with gradient */}
        <motion.span
          animate={{
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered 
              ? "0 0 45px rgba(139,92,246,1)" 
              : "0 0 35px rgba(139,92,246,0.8)",
          }}
          className="relative w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 shadow-lg"
        >
          {/* Inner pulsing dot */}
          <motion.span
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-white"
          />
        </motion.span>

        {/* Floating particles around the logo */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              x: [0, Math.sin(i) * 30],
              y: [0, Math.cos(i) * 30],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute w-1 h-1 rounded-full bg-purple-400"
            style={{
              top: '50%',
              left: '50%',
            }}
          />
        ))}

        {/* Hover tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <div className="px-3 py-1.5 rounded-full bg-gray-900/90 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-xs font-medium shadow-lg">
              ✨ AI Powered ✨
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BrandPulse;