import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const AIStreamingText = ({ text, speed = 30, onComplete }) => {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayed("");
    setIsComplete(false);
    
    let index = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayed((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(intervalRef.current);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, onComplete]);

  return (
    <div className="relative">
      <p className="text-sm leading-relaxed font-mono"
        style={{ color: 'var(--theme-accent)' }}>
        {displayed}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-4 ml-1"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />
        )}
      </p>
      
      {isComplete && text.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-1 mt-2"
        >
          <div className="w-1 h-1 rounded-full animate-bounce"
            style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0s' }} />
          <div className="w-1 h-1 rounded-full animate-bounce"
            style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.2s' }} />
          <div className="w-1 h-1 rounded-full animate-bounce"
            style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.4s' }} />
        </motion.div>
      )}
    </div>
  );
};

export default AIStreamingText;