import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import FlowCard from "./FlowCard";
import AIStreamingText from "./AIStreamingText";

const AIGenerationModal = ({
  isGenerating,
  generationSteps,
  currentStep,
}) => {
  return (
    <AnimatePresence>
      {isGenerating && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl"
          >

            {/* AI Icon */}
            <div className="flex items-center gap-3 mb-5">

              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="p-2 rounded-lg bg-indigo-500/20"
              >
                <Sparkles className="text-indigo-300" size={22} />
              </motion.div>

              <h2 className="text-xl font-semibold text-white">
                AI is building your website
              </h2>

            </div>

            <AIStreamingText text="Understanding your idea and crafting a beautiful website structure..." />

            <div className="mt-6 space-y-3">

              {generationSteps.map((step, index) => (
                <FlowCard
                  key={index}
                  step={step}
                  index={index}
                  active={index === currentStep}
                />
              ))}

            </div>

            {/* Progress Bar */}

            <div className="mt-6 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">

              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / generationSteps.length) * 100}%`
                }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              />

            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIGenerationModal;