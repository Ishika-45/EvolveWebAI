import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Loader2, AlertTriangle, Smartphone, Monitor, Tablet, RefreshCw, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LiveWebsitePreview = ({ code, focusPreview, setFocusPreview }) => {
  const [loaded, setLoaded] = useState(false);
  const [frameError, setFrameError] = useState("");
  const [deviceMode, setDeviceMode] = useState("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [showControls, setShowControls] = useState(true);
  let hideControlsTimeout;

  useEffect(() => {
    setLoaded(false);
    setFrameError("");
  }, [code, focusPreview, refreshKey]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      if (focusPreview) setShowControls(false);
    }, 2000);
  };

  const getDeviceDimensions = () => {
    switch(deviceMode) {
      case "mobile": return "max-w-[375px]";
      case "tablet": return "max-w-[768px]";
      default: return "max-w-full";
    }
  };

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
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      background: var(--theme-bgPrimary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .card {
      max-width: 720px;
      background: var(--theme-cardBg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--theme-borderColor);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }
    h1 {
      font-size: 24px;
      margin-bottom: 16px;
      background: linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p { color: var(--theme-textSecondary); line-height: 1.6; margin: 12px 0; }
    pre {
      margin-top: 20px;
      padding: 16px;
      border-radius: 12px;
      background: rgba(0,0,0,0.4);
      color: #93c5fd;
      overflow: auto;
      font-size: 12px;
      font-family: 'Courier New', monospace;
    }
    .icon { font-size: 48px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">⚠️</div>
    <h1>Preview Unavailable</h1>
    <p>This preview only supports HTML/CSS, but the generated code appears to be React JSX.</p>
    <p><strong>Solution:</strong> Convert the output to HTML before preview, or use a React sandbox environment.</p>
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; }
  </style>
  <title>AI Generated Website</title>
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
        onMouseMove={handleMouseMove}
        className={`${
          focusPreview
            ? "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
            : "relative mt-6"
        } transition-all duration-500`}
      >
        <motion.div
          layout
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className={`relative overflow-hidden rounded-2xl border shadow-2xl ${
            focusPreview
              ? "w-[95vw] h-[92vh]"
              : "w-full mx-auto"
          } ${!focusPreview && getDeviceDimensions()}`}
          style={{ borderColor: 'var(--theme-borderColor)', backgroundColor: 'black' }}
        >
          {/* Device Controls Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b backdrop-blur-sm"
            style={{ borderColor: 'var(--theme-borderColor)', backgroundColor: 'black/0.9' }}>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
              </div>
              <span className="text-[10px] text-gray-500 ml-3 font-mono">
                localhost:3000/preview
              </span>
            </div>

            {!focusPreview && (
              <div className="flex items-center gap-1 rounded-lg p-1"
                style={{ backgroundColor: 'var(--theme-cardBg)' }}>
                <button
                  onClick={() => setDeviceMode("mobile")}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    deviceMode === "mobile" 
                      ? "text-white" 
                      : "text-gray-500 hover:text-white"
                  }`}
                  style={deviceMode === "mobile" ? {
                    backgroundColor: 'var(--theme-accent)/0.2',
                    color: 'var(--theme-accent)'
                  } : {}}
                  title="Mobile View"
                >
                  <Smartphone size={14} />
                </button>
                <button
                  onClick={() => setDeviceMode("tablet")}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    deviceMode === "tablet" 
                      ? "text-white" 
                      : "text-gray-500 hover:text-white"
                  }`}
                  style={deviceMode === "tablet" ? {
                    backgroundColor: 'var(--theme-accent)/0.2',
                    color: 'var(--theme-accent)'
                  } : {}}
                  title="Tablet View"
                >
                  <Tablet size={14} />
                </button>
                <button
                  onClick={() => setDeviceMode("desktop")}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    deviceMode === "desktop" 
                      ? "text-white" 
                      : "text-gray-500 hover:text-white"
                  }`}
                  style={deviceMode === "desktop" ? {
                    backgroundColor: 'var(--theme-accent)/0.2',
                    color: 'var(--theme-accent)'
                  } : {}}
                  title="Desktop View"
                >
                  <Monitor size={14} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                title="Refresh Preview"
              >
                <RefreshCw size={14} />
              </button>

              <button
                onClick={() => {
                  const blob = new Blob([safeCode], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                  URL.revokeObjectURL(url);
                }}
                className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                title="Open in New Tab"
              >
                <ExternalLink size={14} />
              </button>

              {!focusPreview ? (
                <button
                  onClick={() => setFocusPreview(true)}
                  className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                  title="Expand Preview"
                >
                  <Maximize2 size={14} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setFocusPreview(false)}
                    className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                    title="Minimize Preview"
                  >
                    <Minimize2 size={14} />
                  </button>
                  <button
                    onClick={() => setFocusPreview(false)}
                    className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                    title="Close Preview"
                  >
                    <X size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Preview Area */}
          <div className="relative w-full h-[calc(100%-57px)] bg-white">
            {!loaded && !frameError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
                style={{ background: 'var(--theme-bgPrimary)' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8" style={{ color: 'var(--theme-accent)' }} />
                </motion.div>
                <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>Loading preview...</p>
                <div className="flex gap-1 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0s' }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--theme-accent)', animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            {frameError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6 text-center"
                style={{ background: 'var(--theme-bgPrimary)', color: 'var(--theme-error)' }}>
                <AlertTriangle className="w-10 h-10" />
                <p className="text-sm font-medium">{frameError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: 'var(--theme-cardBg)' }}
                >
                  Retry
                </button>
              </div>
            )}

            <iframe
              key={refreshKey}
              title="ai-preview"
              srcDoc={safeCode}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onLoad={() => setLoaded(true)}
              onError={() => setFrameError("Failed to load preview")}
            />

            {(deviceMode === "mobile" || deviceMode === "tablet") && !focusPreview && (
              <div className="absolute inset-0 pointer-events-none rounded-2xl border-8 border-gray-900 shadow-2xl" />
            )}
          </div>

          {loaded && !focusPreview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-2 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] flex items-center gap-1"
              style={{ color: 'var(--theme-success)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-success)' }} />
              Live Preview
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveWebsitePreview;