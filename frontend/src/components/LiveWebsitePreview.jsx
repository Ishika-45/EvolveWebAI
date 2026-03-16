import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { useState } from "react";

const LiveWebsitePreview = ({ code, focusPreview, setFocusPreview }) => {

  const [loaded, setLoaded] = useState(false);

  return (
    <AnimatePresence>

      {code && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}

          onClick={() => focusPreview && setFocusPreview(false)}

          className={`fixed inset-0 z-50 flex items-center justify-center
          transition-all duration-500
          ${focusPreview ? "backdrop-blur-xl bg-black/70" : ""}`}
        >

          {/* Preview Window */}
          <motion.div

            layout

            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: focusPreview ? 1 : 0.95,
              opacity: 1
            }}

            transition={{
              duration: 0.45,
              ease: "easeOut"
            }}

            onClick={(e) => e.stopPropagation()}

            className={`relative bg-black border border-white/10
            rounded-2xl overflow-hidden shadow-2xl

            ${focusPreview
              ? "w-[92vw] h-[92vh]"
              : "w-[900px] h-[520px]"
            }`}
          >

            {/* Browser Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/80">

              <div className="flex items-center gap-2">

                <div className="w-3 h-3 bg-red-500 rounded-full"/>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"/>
                <div className="w-3 h-3 bg-green-500 rounded-full"/>

                <span className="text-xs text-gray-400 ml-4">
                  evolveweb-ai-preview.vercel.app
                </span>

              </div>

              <div className="flex items-center gap-3">

                {!focusPreview && (
                  <button
                    onClick={() => setFocusPreview(true)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition"
                  >
                    <Maximize2 size={16}/>
                  </button>
                )}

                {focusPreview && (
                  <button
                    onClick={() => setFocusPreview(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition"
                  >
                    <X size={16}/>
                  </button>
                )}

              </div>

            </div>

            {/* Loading shimmer */}
            {!loaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-900 flex items-center justify-center text-gray-400 text-sm">
                Loading preview...
              </div>
            )}

            {/* Website Frame */}
            <div className="w-full h-full bg-white">

              <iframe
                title="ai-preview"
                srcDoc={code}
                className="w-full h-full border-none"
                onLoad={() => setLoaded(true)}
              />

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
};

export default LiveWebsitePreview;