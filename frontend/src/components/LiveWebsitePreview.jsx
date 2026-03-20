import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LiveWebsitePreview = ({ code, focusPreview, setFocusPreview }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [code, focusPreview]);

  const safeCode = useMemo(() => {
    if (!code) return "";
    if (code.includes("<html")) return code;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>AI Preview</title>
</head>
<body>
${code}
</body>
</html>
    `;
  }, [code]);

  if (!code) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={focusPreview ? "fullscreen-preview" : "inline-preview"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => focusPreview && setFocusPreview(false)}
        className={`${
          focusPreview
            ? "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4"
            : "relative mt-10"
        } transition-all duration-500`}
      >
        <motion.div
          layout
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl ${
            focusPreview
              ? "w-[95vw] h-[92vh]"
              : "w-full max-w-6xl h-[560px] mx-auto"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/90">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-400 ml-4 truncate">
                evolveweb-ai-preview.vercel.app
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!focusPreview ? (
                <button
                  onClick={() => setFocusPreview(true)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                  aria-label="Expand preview"
                >
                  <Maximize2 size={16} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setFocusPreview(false)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                    aria-label="Minimize preview"
                  >
                    <Minimize2 size={16} />
                  </button>

                  <button
                    onClick={() => setFocusPreview(false)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                    aria-label="Close preview"
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="relative w-full h-[calc(100%-57px)] bg-white">
            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                <p className="text-sm">Loading preview...</p>
              </div>
            )}

            <iframe
              title="ai-preview"
              srcDoc={safeCode}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-popups"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveWebsitePreview;