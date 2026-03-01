import { useState } from "react";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const [idea, setIdea] = useState("");

  return (
    <div className="w-full flex flex-col items-center">

      {/* Greeting */}
      <div className="text-center mt-12 mb-16">
        <h1 className="text-5xl font-semibold tracking-tight text-white">
          Welcome back, Ishika
          <motion.span
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block ml-3"
          >
            👋
          </motion.span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          Describe your idea and let AI craft a stunning website instantly.
        </p>
      </div>

      {/* AI Command Card */}
      <div className="w-full max-w-3xl relative
                      bg-white/5 backdrop-blur-2xl
                      border border-white/10
                      rounded-3xl p-10
                      shadow-[0_0_60px_rgba(99,102,241,0.15)]
                      transition-all duration-300">

        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe the website you want to build..."
          className="w-full h-36 bg-transparent resize-none
                     outline-none text-gray-200
                     placeholder-gray-500 text-lg leading-relaxed
                     focus:ring-2 focus:ring-indigo-500/40
                     rounded-xl p-4"
        />

        <div className="flex justify-end mt-6">
          <button
            className="px-8 py-3 rounded-xl
                       bg-gradient-to-r from-purple-500 to-indigo-500
                       font-medium text-white
                       shadow-lg shadow-indigo-500/30
                       hover:scale-[1.03]
                       active:scale-95
                       transition-all duration-200"
          >
            Generate Website
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
        {["Projects", "Templates Used", "AI Generations"].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl
                       border border-white/10
                       rounded-2xl p-6 text-center"
          >
            <p className="text-gray-400 text-sm">{item}</p>
            <h3 className="text-2xl font-semibold mt-2">0{i + 2}</h3>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="w-full max-w-5xl mt-16">
        <h2 className="text-xl font-semibold mb-6">
          Recent Projects
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/5 backdrop-blur-xl
                         border border-white/10
                         rounded-2xl p-6
                         hover:bg-white/10
                         transition"
            >
              <h3 className="text-lg font-medium">
                Project {item}
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                AI Generated Website
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;