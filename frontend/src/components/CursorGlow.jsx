import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [trail, setTrail] = useState([]);
  const moveTimeoutRef = useRef(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPosition(newPos);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      setIsMoving(true);
      
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
      
      setTrail(prev => {
        const newTrail = [...prev, newPos];
        if (newTrail.length > 8) newTrail.shift();
        return newTrail;
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Gradient Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-150"
        style={{
          background: `radial-gradient(
            400px at ${position.x}px ${position.y}px,
            var(--theme-accent) 0.15,
            var(--theme-gradient-end) 0.08 40%,
            transparent 80%
          )`
        }}
      />
      
      {/* Secondary Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-75"
        style={{
          background: `radial-gradient(
            150px at ${position.x}px ${position.y}px,
            var(--theme-accent) 0.2,
            transparent 60%
          )`
        }}
      />

      {/* Custom Cursor Dot */}
      <motion.div
        className="fixed pointer-events-none z-50 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isMoving ? 1.2 : 1,
            opacity: isMoving ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <div className="w-8 h-8 rounded-full border-2 opacity-50"
            style={{ borderColor: 'var(--theme-accent)' }} />
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }} />
        </motion.div>
      </motion.div>

      {/* Trail Effect */}
      {trail.map((pos, idx) => (
        <div
          key={idx}
          className="fixed pointer-events-none z-0 transition-opacity duration-300"
          style={{
            left: pos.x - 2,
            top: pos.y - 2,
            opacity: 0.1 - idx * 0.012,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <div className="w-1 h-1 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }} />
        </div>
      ))}

      {/* Static ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: 'var(--theme-accent)/0.1' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: 'var(--theme-gradient-end)/0.1', animationDelay: '2s' }} />
      </div>
    </>
  );
};

export default CursorGlow;