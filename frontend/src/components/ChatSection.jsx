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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-purple-300 font-medium">AI-Powered Generation</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          What are we{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            building today?
          </span>
        </h1>
        
        <p className="text-gray-400 text-sm max-w-md mx-auto">
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
            {/* Glow effect on focus */}
            {isFocused && (
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-30" />
            )}
            
            {/* Input Container */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Message Icon */}
              <div className="absolute left-4 top-4 text-gray-500">
                <MessageSquare size={18} />
              </div>
              
              {/* Textarea */}
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
              
              {/* Bottom Bar */}
              <div className="absolute bottom-2 left-0 right-0 px-3 py-2 flex items-center justify-between border-t border-white/10 bg-white/5">
                {/* Left side - Character count and attachments */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-purple-400"
                    title="Attach file"
                  >
                    <Paperclip size={14} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-purple-400"
                    title="Voice input"
                  >
                    <Mic size={14} />
                  </button>
                  <span className={`text-[10px] ${charCount > 500 ? 'text-red-400' : 'text-gray-500'}`}>
                    {charCount}/500
                  </span>
                </div>
                
                {/* Right side - Submit button */}
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                    ${message.trim() && !isLoading
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                      : "bg-white/10 text-gray-500 cursor-not-allowed"
                    }`}
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
          <Lightbulb size={12} className="text-purple-400" />
          <span className="text-xs text-gray-500">Try these ideas:</span>
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
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300"
            >
              <span>{suggestion}</span>
              <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-3 rounded-xl bg-purple-500/5 border border-purple-500/20"
      >
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Zap size={12} className="text-purple-400" />
          <span>
            AI generates fully responsive HTML/CSS websites. Include specific details for better results!
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatSection;