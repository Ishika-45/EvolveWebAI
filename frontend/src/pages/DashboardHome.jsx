import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
 import { useLocation } from "react-router-dom";

const DashboardHome = () => {
  const [idea, setIdea] = useState("");
  const [projects, setProjects] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const generationSteps = [
  "🧠 Understanding your idea",
  "🧩 Structuring layout architecture",
  "🎨 Designing interface components",
  "⚡ Optimizing responsiveness",
  "🚀 Finalizing your website"
];


const location = useLocation();

useEffect(() => {
  const savedProjects =
    JSON.parse(localStorage.getItem("ew_projects")) || [];

  setProjects(savedProjects);
}, [location]);

  const LoadingDots = () => {
  return (
    <div className="flex gap-1 ml-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="w-2 h-2 bg-white rounded-full"
        />
      ))}
    </div>
  );
};

const handleGenerate = () => {
  if (!idea.trim()) return;

  setIsGenerating(true);
  setCurrentStep(0);

  let stepIndex = 0;

  const interval = setInterval(() => {
    stepIndex++;

    if (stepIndex < generationSteps.length) {
      setCurrentStep(stepIndex);
    } else {
      clearInterval(interval);

      const newProject = {
  id: Date.now().toString(),
  title: idea.length > 30 ? idea.slice(0, 30) + "..." : idea,
  idea,
  date: new Date().toLocaleString(),
  versions: [],
  sections: [
    {
      title: "Problem",
      description: "AI will generate this section."
    },
    {
      title: "Target Audience",
      description: "AI will generate this section."
    },
    {
      title: "Solution",
      description: "AI will generate this section."
    },
    {
      title: "Business Model",
      description: "AI will generate this section."
    },
    {
      title: "Key Features",
      description: "AI will generate this section."
    }
  ]
};

setProjects((prev) => {
  const updated = [newProject, ...prev];
  localStorage.setItem(
    "ew_projects",
    JSON.stringify(updated)
  );
  return updated;
});

setIdea("");
setIsGenerating(false);
setCurrentStep(0);

// Small cinematic delay
setTimeout(() => {
  navigate(`/dashboard/project/${newProject.id}`);
}, 400);

      setProjects((prev) => {
        const updated = [newProject, ...prev];
        localStorage.setItem(
          "ew_projects",
          JSON.stringify(updated)
        );
        return updated;
      });

      setIdea("");
      setIsGenerating(false);
      setCurrentStep(0);
    }
  }, 700);
};

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
      <div className={`w-full max-w-3xl relative
                 bg-white/5 backdrop-blur-2xl
                 border border-white/10
                 rounded-3xl p-10
                 transition-all duration-500
                 ${
                  isGenerating
  ? "shadow-[0_0_100px_rgba(99,102,241,0.45)] animate-pulse"
                     : "shadow-[0_0_60px_rgba(99,102,241,0.15)] animate-pulse"
                 }`}
>

        <textarea
  value={idea}
  onChange={(e) => setIdea(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isGenerating) handleGenerate();
    }
  }}
  placeholder="Describe the website you want to build..."
  className="w-full h-36 bg-transparent resize-none
             outline-none text-gray-200
             placeholder-gray-500 text-lg leading-relaxed
             focus:ring-2 focus:ring-indigo-500/40
             rounded-xl p-4"
  disabled={isGenerating}
/>

{isGenerating && (
  <div className="mt-6 space-y-4">

    {/* Steps */}
    <div className="space-y-2">
      {generationSteps.slice(0, currentStep + 1).map((step, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`text-sm ${
            index === currentStep
              ? "text-indigo-300"
              : "text-gray-500"
          }`}
        >
          {step}
        </motion.p>
      ))}
    </div>

    {/* Progress Bar */}
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
        initial={{ width: 0 }}
        animate={{
          width: `${((currentStep + 1) / generationSteps.length) * 100}%`
        }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      />
    </div>

  </div>
)}

        <div className="flex justify-end mt-6">
          <button
  onClick={handleGenerate}
  disabled={isGenerating}
  className={`px-8 py-3 rounded-xl
             bg-gradient-to-r from-purple-500 to-indigo-500
             font-medium text-white
             shadow-lg shadow-indigo-500/30
             flex items-center justify-center
             transition-all duration-300
             ${isGenerating 
               ? "opacity-80 cursor-not-allowed"
               : "hover:scale-[1.03] active:scale-95"
             }`}
>
  {isGenerating ? (
    <>
      Generating
      <LoadingDots />
    </>
  ) : (
    "Generate Website"
  )}
</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-gray-400 text-sm">Projects</p>
          <h3 className="text-2xl font-semibold mt-2">
            {projects.length}
          </h3>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-gray-400 text-sm">Templates Used</p>
          <h3 className="text-2xl font-semibold mt-2">12</h3>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-gray-400 text-sm">AI Generations</p>
          <h3 className="text-2xl font-semibold mt-2">
            {projects.length}
          </h3>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="w-full max-w-5xl mt-20">
        <h2 className="text-xl font-semibold mb-6 text-gray-200">
          Recent Projects
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
  key={project.id}
  onClick={() =>
  navigate(`/dashboard/project/${project.id}`, {
    state: { project },
  })
}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
  className="group bg-white/5 backdrop-blur-xl
             border border-white/10
             rounded-2xl p-6
             cursor-pointer
             transition-all duration-300
             hover:-translate-y-2
             hover:scale-[1.02]
             hover:bg-white/10
             hover:border-indigo-400/30
             hover:shadow-[0_20px_50px_rgba(99,102,241,0.35)]"
>
                <h3 className="text-lg font-medium">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Generated on {project.date}
                </p>
                <p className="text-indigo-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition duration-300">
  Open Project →
</p>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
};

export default DashboardHome;