import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Zap, 
  Loader2, 
  Mic, 
  Paperclip,
  ArrowRight,
  MessageSquare,
  Lightbulb
} from "lucide-react";

const ChatSection = ({ onGenerate, isLoading = false }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [suggestions, setSuggestions] = useState([
    "Build a modern SaaS landing page",
    "Create a portfolio for a photographer",
    "Design an e-commerce store",
    "Make a blog about AI technology",
    "Create a dashboard for analytics"
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onGenerate?.(message);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
          style={{
            backgroundColor: 'var(--theme-accent)/10',
            borderColor: 'var(--theme-accent)/30',
            borderWidth: '1px'
          }}>
          <Sparkles className="w-3 h-3" style={{ color: 'var(--theme-accent)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--theme-accent)' }}>AI-Powered Generation</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          What are we{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            building today?
          </span>
        </h1>
        
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--theme-textSecondary)' }}>
          Describe your dream website and let our AI bring it to life in seconds
        </p>
      </motion.div>

      {/* Chat Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <form onSubmit={handleSubmit}>
          <div className={`relative transition-all duration-300 ${
            isFocused ? 'scale-[1.02]' : ''
          }`}>
            {isFocused && (
              <div className="absolute -inset-0.5 rounded-2xl blur-xl opacity-30"
                style={{
                  background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                }} />
            )}
            
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--theme-cardBg)',
                borderColor: 'var(--theme-borderColor)',
                borderWidth: '1px',
                backdropFilter: 'blur(12px)'
              }}>
              <div className="absolute left-4 top-4" style={{ color: 'var(--theme-textSecondary)' }}>
                <MessageSquare size={18} />
              </div>
              
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="E.g., Build a modern landing page for an AI startup with pricing, features, and a contact form..."
                rows={3}
                className="w-full pl-12 pr-4 pt-4 pb-12 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none"
              />
              
              <div className="absolute bottom-2 left-0 right-0 px-3 py-2 flex items-center justify-between border-t"
                style={{
                  borderColor: 'var(--theme-borderColor)',
                  backgroundColor: 'var(--theme-cardBg)'
                }}>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: 'var(--theme-textSecondary)' }}
                    title="Attach file"
                  >
                    <Paperclip size={14} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: 'var(--theme-textSecondary)' }}
                    title="Voice input"
                  >
                    <Mic size={14} />
                  </button>
                  <span className={`text-[10px] ${charCount > 500 ? 'text-red-400' : ''}`}
                    style={charCount > 500 ? {} : { color: 'var(--theme-textSecondary)' }}>
                    {charCount}/500
                  </span>
                </div>
                
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                    ${message.trim() && !isLoading
                      ? "text-white hover:shadow-lg"
                      : "cursor-not-allowed"
                    }`}
                  style={message.trim() && !isLoading ? {
                    background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
                    boxShadow: `0 0 20px var(--theme-glow)`
                  } : {
                    backgroundColor: 'var(--theme-cardBg)',
                    color: 'var(--theme-textSecondary)'
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Suggestions Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={12} style={{ color: 'var(--theme-accent)' }} />
          <span className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>Try these ideas:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSuggestionClick(suggestion)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-cardBg)',
                borderColor: 'var(--theme-borderColor)',
                borderWidth: '1px',
                color: 'var(--theme-textSecondary)'
              }}
            >
              <span>{suggestion}</span>
              <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--theme-accent)' }} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-3 rounded-xl"
        style={{
          backgroundColor: 'var(--theme-accent)/5',
          borderColor: 'var(--theme-accent)/20',
          borderWidth: '1px'
        }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
          <Zap size={12} style={{ color: 'var(--theme-accent)' }} />
          <span>
            AI generates fully responsive HTML/CSS websites. Include specific details for better results!
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatSection;