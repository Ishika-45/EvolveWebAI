import { useState } from "react";
import { motion } from "framer-motion";

const tools = [
  { id: "analysis", name: "Idea Analysis" },
  { id: "improve", name: "Improve Idea" },
  { id: "blueprint", name: "Startup Blueprint" },
  { id: "features", name: "Feature Generator" },
  { id: "website", name: "Website Structure" }
];

export default function StartupBuilder() {
  const [activeTool, setActiveTool] = useState("analysis");
  const [result, setResult] = useState("");

  const runTool = () => {
    // temporary demo output
    const fakeOutputs = {
      analysis:
        "Your startup idea targets a growing market. The main opportunity is automation and AI-driven workflow optimization.",
      improve:
        "Improved idea: Build an AI-powered SaaS platform that helps teams generate, validate, and launch startup ideas faster.",
      blueprint:
        "Blueprint:\n1. Problem\n2. Solution\n3. Target Users\n4. Revenue Model\n5. Go-To-Market Strategy",
      features:
        "Core Features:\n• AI Idea Generator\n• Market Research Tool\n• Landing Page Builder\n• AI Business Plan Generator",
      website:
        "Website Structure:\n• Landing Page\n• Product Features\n• Pricing Page\n• Dashboard\n• Blog"
    };

    setResult(fakeOutputs[activeTool]);
  };

  return (
    <div className="flex h-full gap-6">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">

        <h2 className="text-lg font-semibold text-white mb-4">
          AI Builder Tools
        </h2>

        <div className="space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-full text-left px-4 py-2 rounded-xl transition ${
                activeTool === tool.id
                  ? "bg-indigo-500 text-white"
                  : "text-white/70 hover:bg-white/10"
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>

        <button
          onClick={runTool}
          className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white"
        >
          Run AI
        </button>

      </div>

      {/* RIGHT WORKSPACE */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >

        <h2 className="text-xl font-semibold text-white mb-4">
          Workspace
        </h2>

        {result ? (
          <pre className="text-white/80 whitespace-pre-wrap">
            {result}
          </pre>
        ) : (
          <p className="text-white/50">
            Select a tool and run AI to generate results.
          </p>
        )}

      </motion.div>
    </div>
  );
}