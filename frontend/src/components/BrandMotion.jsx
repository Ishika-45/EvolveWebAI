import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import BrandPulse from "./BrandPulse";

// Import your animation files (add more as needed)
import testAnim from "../assets/ai-animation.json";
// import christmasAnim from "../assets/christmas.json";
// import newYearAnim from "../assets/new-year.json";
// import halloweenAnim from "../assets/halloween.json";

const BrandMotion = () => {
  const today = useMemo(() => new Date(), []);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // 🔥 Toggle this to true to preview special animation (for testing)
  const PREVIEW_MODE = false;

  const getSpecialAnimation = () => {
    if (PREVIEW_MODE) {
      return { animation: testAnim, type: "preview", message: "Preview Mode Active" };
    }

    const month = today.getMonth() + 1;
    const date = today.getDate();

    // Christmas (Dec 24-26)
    if (month === 12 && date >= 24 && date <= 26) {
      return { 
        animation: testAnim,
        type: "christmas", 
        message: "🎄 Merry Christmas! 🎄" 
      };
    }
    
    // New Year (Dec 31 - Jan 2)
    if ((month === 12 && date === 31) || (month === 1 && date <= 2)) {
      return { 
        animation: testAnim,
        type: "newyear", 
        message: "🎆 Happy New Year! 🎆" 
      };
    }
    
    // Halloween (Oct 31)
    if (month === 10 && date === 31) {
      return { 
        animation: testAnim,
        type: "halloween", 
        message: "🎃 Happy Halloween! 🎃" 
      };
    }
    
    // Valentine's Day (Feb 14)
    if (month === 2 && date === 14) {
      return { 
        animation: testAnim,
        type: "valentine", 
        message: "💝 Happy Valentine's Day! 💝" 
      };
    }

    return null;
  };

  const specialEvent = getSpecialAnimation();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (specialEvent) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [specialEvent]);

  if (specialEvent) {
    return (
      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.3 : 0.1
            }}
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, var(--theme-accent), var(--theme-gradient-end))`
            }}
          />
          
          <div className="relative w-28 opacity-95"
            style={{
              filter: `drop-shadow(0 0 30px var(--theme-glow))`
            }}>
            <Lottie 
              animationData={specialEvent.animation} 
              loop={true} 
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                <div className="px-3 py-1.5 rounded-full backdrop-blur-sm text-white text-xs font-medium shadow-lg"
                  style={{
                    backgroundColor: 'var(--theme-accent)/90',
                    borderColor: 'var(--theme-borderColor)'
                  }}>
                  {specialEvent.type === "christmas" && "🎄 Holiday Special! 🎄"}
                  {specialEvent.type === "newyear" && "🎆 New Year Celebration! 🎆"}
                  {specialEvent.type === "halloween" && "🎃 Spooky Season! 🎃"}
                  {specialEvent.type === "valentine" && "💝 Love is in the air! 💝"}
                  {specialEvent.type === "preview" && "✨ Preview Mode ✨"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showMessage && specialEvent.message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap z-50"
            >
              <div className="px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg"
                style={{
                  background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                }}>
                {specialEvent.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return <BrandPulse />;
};

export default BrandMotion;