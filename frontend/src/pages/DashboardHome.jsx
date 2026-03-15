import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import AIStreamingText from "../components/AIStreamingText";
import FlowCard from "../components/FlowCard";
import AIGenerationModal from "../components/AIGenerationModal";
import WebsiteBlueprint from "../components/WebsiteBlueprint";

const DashboardHome = () => {

  const [idea, setIdea] = useState("");
  const [projects, setProjects] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generationFinished, setGenerationFinished] = useState(false);
  const [blueprintSections, setBlueprintSections] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic user name
  const [userName, setUserName] = useState("User");

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser || storedUser === "undefined") return;

  try {
    const parsedUser = JSON.parse(storedUser);

    if (parsedUser?.name) {
      const firstName = parsedUser.name.split(" ")[0]; // get first name
      setUserName(firstName);
    }

  } catch (err) {
    console.error("User parse error", err);
  }
}, []);
  const generationSteps = [
    "🧠 Understanding your idea",
    "🧩 Structuring layout architecture",
    "🎨 Designing interface components",
    "⚡ Optimizing responsiveness",
    "🚀 Finalizing your website"
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to load projects", err);
      }
    };

    fetchProjects();
  }, [location]);

  const LoadingDots = () => {
    return (
      <div className="flex gap-1 ml-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 bg-white rounded-full"
          />
        ))}
      </div>
    );
  };

  const generateBlueprint = (idea) => {
    const ideaLower = idea.toLowerCase();

    if (ideaLower.includes("saas")) {
      return [
        "Hero Section",
        "Problem Section",
        "Solution Section",
        "Features Section",
        "Pricing Section",
        "Testimonials",
        "Call To Action",
        "Footer"
      ];
    }

    if (ideaLower.includes("portfolio")) {
      return [
        "Hero Section",
        "About Me",
        "Projects Showcase",
        "Skills",
        "Testimonials",
        "Contact Section",
        "Footer"
      ];
    }

    if (ideaLower.includes("startup")) {
      return [
        "Hero Section",
        "Problem",
        "Solution",
        "Product Demo",
        "Key Features",
        "Pricing",
        "FAQ",
        "Footer"
      ];
    }

    return [
      "Hero Section",
      "Features Section",
      "How It Works",
      "Benefits",
      "Testimonials",
      "Call To Action",
      "Footer"
    ];
  };

  const handleGenerate = async () => {

    if (!idea.trim()) return;

    const sections = generateBlueprint(idea);
    setBlueprintSections(sections);

    setIsGenerating(true);
    setCurrentStep(0);

    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex++;

      if (stepIndex < generationSteps.length) {
        setCurrentStep(stepIndex);
      } else {
        clearInterval(interval);
      }
    }, 700);

    try {

      const res = await api.post("/projects", {
        title: idea.length > 30 ? idea.slice(0, 30) + "..." : idea,
        idea,
        sections: [
          { title: "Problem", description: "AI will generate this section." },
          { title: "Target Audience", description: "AI will generate this section." },
          { title: "Solution", description: "AI will generate this section." },
          { title: "Business Model", description: "AI will generate this section." },
          { title: "Key Features", description: "AI will generate this section." }
        ]
      });

      const newProject = res.data;

      setProjects((prev) => [newProject, ...prev]);

      setIdea("");
      setIsGenerating(false);
      setCurrentStep(0);
      setGenerationFinished(true);

      setTimeout(() => {
        navigate(`/dashboard/project/${newProject._id}`);
      }, 4000);

    } catch (err) {
      console.error("Project creation failed", err);
      setIsGenerating(false);
    }
  };

  return (

    <div className="w-full flex flex-col items-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Greeting */}
      <div className="text-center mt-14 mb-20">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-semibold tracking-tight text-white"
        >
          Welcome back, <span className="text-indigo-400">{userName}</span>
          <motion.span
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block ml-3"
          >
            👋
          </motion.span>
        </motion.h1>

        <p className="text-gray-400 mt-5 text-lg max-w-2xl mx-auto">
          Turn your idea into a full startup website in seconds using AI.
        </p>

        <div className="flex justify-center gap-6 mt-8 text-sm text-gray-400">

          <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            ⚡ Instant website generation
          </span>

          <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            🧠 AI startup analysis
          </span>

          <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            🚀 Production ready UI
          </span>

        </div>
      </div>

      {/* AI Generator Card */}

      <div className={`w-full max-w-3xl relative
      bg-white/5 backdrop-blur-2xl
      border border-white/10
      rounded-3xl p-10
      transition-all duration-500
      ${isGenerating
          ? "shadow-[0_0_100px_rgba(99,102,241,0.45)] animate-pulse"
          : "shadow-[0_0_60px_rgba(99,102,241,0.15)]"
        }`}>

       <textarea
  value={idea}
  onChange={(e) => setIdea(e.target.value)}
  placeholder="Describe your startup idea..."
  className="w-full h-40 p-5 rounded-xl 
  bg-white/5 border border-white/10 
  text-white placeholder-gray-400
  focus:outline-none focus:border-indigo-400
  focus:ring-2 focus:ring-indigo-500/40
  shadow-[inset_0_0_15px_rgba(99,102,241,0.25)]
  transition-all"
/>

        {isGenerating && (
          <div className="mt-8 space-y-6">

            <AIStreamingText text="Analyzing your idea and generating a beautiful website structure..." />

            <div className="grid gap-3">
              {generationSteps.map((step, index) => (
                <FlowCard
                  key={index}
                  step={step}
                  index={index}
                  active={index === currentStep}
                />
              ))}
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / generationSteps.length) * 100}%`
                }}
              />
            </div>

          </div>
        )}

        <div className="flex justify-end mt-6">

         <button
  disabled={isGenerating}
  onClick={handleGenerate}
  className="mt-6 px-8 py-3 rounded-xl
  bg-gradient-to-r from-indigo-500 to-purple-600
  text-white font-semibold
  hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]
  transition-all duration-300
  disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isGenerating ? "Generating..." : "Generate Blueprint"}
</button>
        </div>
      </div>

      {generationFinished && (
        <div className="w-full max-w-5xl mt-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <WebsiteBlueprint sections={blueprintSections} />
          </div>
        </div>
      )}

      {/* Stats */}

      <div className="grid grid-cols-3 gap-6 mt-16 w-full max-w-5xl">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">Projects</p>
          <h3 className="text-2xl font-semibold mt-2">{projects.length}</h3>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">Templates Used</p>
          <h3 className="text-2xl font-semibold mt-2">12</h3>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">AI Generations</p>
          <h3 className="text-2xl font-semibold mt-2">{projects.length}</h3>
        </div>

      </div>

      {/* Recent Projects */}

      <div className="w-full max-w-5xl mt-20">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold text-gray-200">
            Recent Projects
          </h2>

          <button
            onClick={() => navigate("/dashboard/projects")}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            View All →
          </button>

        </div>

        <div className="grid grid-cols-3 gap-6">

          <AnimatePresence>
            {projects.map((project) => (

              <motion.div
                key={project._id}
                onClick={() => navigate(`/dashboard/project/${project._id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:-translate-y-2 transition"
              >

                <h3 className="text-lg font-medium">{project.title}</h3>

                <p className="text-gray-400 text-sm mt-2">
                  Generated on {project.createdAt
  ? new Date(project.createdAt).toLocaleDateString()
  : "Today"}
                </p>

                <p className="text-indigo-400 text-sm mt-4 opacity-0 group-hover:opacity-100 transition">
                  Open Project →
                </p>

              </motion.div>

            ))}
          </AnimatePresence>

        </div>

      </div>

      <AIGenerationModal
        isGenerating={isGenerating}
        generationSteps={generationSteps}
        currentStep={currentStep}
      />

    </div>
  );
};

export default DashboardHome;