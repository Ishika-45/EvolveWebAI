import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationData from "../assets/ai-animation.json";

const AiAnimation = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mt-10 w-[320px] lg:w-[380px] mx-auto"
    >
      {/* Glow effect behind animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Main Animation */}
      <div className="relative z-10">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Floating particles around animation */}
      <div className="absolute -top-4 -right-4 w-2 h-2 bg-purple-400 rounded-full animate-float" />
      <div className="absolute -bottom-2 -left-3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 -right-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Status Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs text-purple-300 font-medium">AI Engine Active</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AiAnimation;