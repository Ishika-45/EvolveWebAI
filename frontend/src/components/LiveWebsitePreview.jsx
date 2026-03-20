import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Loader2, AlertTriangle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LiveWebsitePreview = ({ code, focusPreview, setFocusPreview }) => {
  const [loaded, setLoaded] = useState(false);
  const [frameError, setFrameError] = useState("");

  useEffect(() => {
    setLoaded(false);
    setFrameError("");
  }, [code, focusPreview]);

  const safeCode = useMemo(() => {
    if (!code) return "";

    const trimmed = code.trim();

    if (
      trimmed.includes('import React') ||
      trimmed.includes('export default') ||
      trimmed.includes("function LandingPage") ||
      trimmed.includes("return (")
    ) {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Preview Error</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
      box-sizing: border-box;
    }
    .card {
      max-width: 720px;
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 24px;
    }
    h1 {
      font-size: 22px;
      margin-bottom: 12px;
      color: #a5b4fc;
    }
    p {
      color: #cbd5e1;
      line-height: 1.6;
      margin: 8px 0;
    }
    pre {
      margin-top: 16px;
      padding: 16px;
      border-radius: 12px;
      background: rgba(0,0,0,0.35);
      color: #93c5fd;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Preview unavailable</h1>
    <p>This preview iframe only supports HTML, but the generated code looks like React JSX/component code.</p>
    <p>Either convert the generated output to full HTML before previewing, or render this code through a React sandbox/compiler pipeline.</p>
    <pre>${trimmed
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre>
  </div>
</body>
</html>
      `;
    }

    if (trimmed.includes("<html")) return trimmed;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>AI Preview</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
${trimmed}
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
            {!loaded && !frameError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                <p className="text-sm">Loading preview...</p>
              </div>
            )}

            {frameError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-red-400 p-6 text-center">
                <AlertTriangle className="w-6 h-6" />
                <p className="text-sm">{frameError}</p>
              </div>
            )}

           <iframe
  title="ai-preview"
  srcDoc={safeCode}
  className="w-full h-full border-none"
  sandbox="allow-scripts allow-popups"
  onLoad={() => setLoaded(true)}
/>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveWebsitePreview;