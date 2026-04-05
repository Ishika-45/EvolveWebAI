import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Zap, Brain, Code, Rocket, CheckCircle } from "lucide-react";
import FlowCard from "./FlowCard";
import AIStreamingText from "./AIStreamingText";

const AIGenerationModal = ({
  isGenerating,
  generationSteps,
  currentStep,
}) => {
  // Icons for different steps
  const stepIcons = [
    { icon: Brain, color: "purple" },
    { icon: Code, color: "blue" },
    { icon: Zap, color: "yellow" },
    { icon: Rocket, color: "pink" },
    { icon: Sparkles, color: "green" },
  ];

  const getStepIcon = (index, isActive, isComplete) => {
    if (isComplete) return CheckCircle;
    if (isActive) return Loader2;
    return stepIcons[index]?.icon || Sparkles;
  };

  const getIconColor = (index, isActive, isComplete) => {
    if (isComplete) return "text-green-400";
    if (isActive) return "text-purple-400 animate-spin";
    return `text-${stepIcons[index]?.color || 'gray'}-400`;
  };

  return (
    <AnimatePresence>
      {isGenerating && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="relative w-full max-w-xl mx-4"
          >
            {/* Glow effect behind modal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-30" />
            
            {/* Modal Content */}
            <div className="relative bg-gradient-to-br from-gray-900 to-purple-950 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
              
              {/* Header with animated icon */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, repeatDelay: 1 }
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-md" />
                  <div className="relative p-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/30">
                    <Sparkles className="text-purple-400" size={24} />
                  </div>
                </motion.div>
                
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    AI is building your website
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    This may take a few seconds
                  </p>
                </div>
              </div>

              {/* AI Streaming Text */}
              <div className="mb-6 p-4 rounded-xl bg-black/30 border border-purple-500/20">
                <AIStreamingText text="Analyzing your requirements and crafting a beautiful website structure with modern design patterns..." />
              </div>

              {/* Generation Steps */}
              <div className="space-y-3 mb-6">
                {generationSteps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isComplete = index < currentStep;
                  const StepIcon = getStepIcon(index, isActive, isComplete);
                  const iconColor = getIconColor(index, isActive, isComplete);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                        ${isActive 
                          ? "bg-purple-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10" 
                          : isComplete
                          ? "bg-green-500/10 border border-green-500/20"
                          : "bg-white/5 border border-white/10 opacity-60"
                        }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-purple-500/30' : isComplete ? 'bg-green-500/20' : 'bg-white/10'}`}>
                        <StepIcon size={16} className={iconColor} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isActive ? 'text-purple-300' : isComplete ? 'text-green-300' : 'text-gray-400'}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">{step.desc}</p>
                      </div>
                      {isComplete && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <CheckCircle size={12} className="text-white" />
                        </motion.div>
                      )}
                      {isActive && (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0s' }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Bar with Percentage */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Generation Progress</span>
                  <span className="text-purple-400 font-mono">
                    {Math.round(((currentStep + 1) / generationSteps.length) * 100)}%
                  </span>
                </div>
                <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / generationSteps.length) * 100}%`
                    }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                  />
                  {/* Animated shimmer effect */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['0%', '500%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ width: '30%' }}
                  />
                </div>
              </div>

              {/* Estimated Time */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-center"
              >
                <p className="text-xs text-gray-500">
                  Estimated time: {Math.max(2, Math.floor((generationSteps.length - currentStep) * 1.5))} seconds remaining
                </p>
              </motion.div>

              {/* Tip Section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20"
              >
                <p className="text-xs text-purple-300 text-center">
                  💡 Pro Tip: The more detailed your description, the better your website will be!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIGenerationModal;