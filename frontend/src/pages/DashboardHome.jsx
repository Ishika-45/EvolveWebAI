import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

import AIStreamingText from "../components/AIStreamingText";
import FlowCard from "../components/FlowCard";
import AIGenerationModal from "../components/AIGenerationModal";

const DashboardHome = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [idea, setIdea] = useState("");
  const [projects, setProjects] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [blueprintSections, setBlueprintSections] = useState([]);
  const [typedSections, setTypedSections] = useState([]);

  const [userName, setUserName] = useState("User");

  /* ---------------- USER NAME ---------------- */

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    try {

      const parsedUser = JSON.parse(storedUser);

      if (parsedUser?.name) {

        const first = parsedUser.name.split(" ")[0];
        setUserName(first);

      }

    } catch (err) {
      console.error(err);
    }

  }, []);

  /* ---------------- FETCH PROJECTS ---------------- */

  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const res = await api.get("/projects");
        setProjects(res.data);

      } catch (err) {
        console.error(err);
      }

    };

    fetchProjects();

  }, [location]);

  /* ---------------- AI GENERATION STEPS ---------------- */

  const generationSteps = [
    "🧠 Understanding your idea",
    "🧩 Structuring layout architecture",
    "🎨 Designing interface components",
    "⚡ Optimizing responsiveness",
    "🚀 Finalizing your website"
  ];

  /* ---------------- BLUEPRINT ---------------- */

  const generateBlueprint = (idea) => {

    const text = idea.toLowerCase();

    if (text.includes("saas")) {

      return [
        "Hero Section",
        "Problem Section",
        "Solution Section",
        "Features",
        "Pricing",
        "Testimonials",
        "CTA",
        "Footer"
      ];

    }

    if (text.includes("portfolio")) {

      return [
        "Hero",
        "About",
        "Projects",
        "Skills",
        "Testimonials",
        "Contact",
        "Footer"
      ];

    }

    return [
      "Hero Section",
      "Features",
      "How It Works",
      "Benefits",
      "Testimonials",
      "CTA",
      "Footer"
    ];

  };

  /* ---------------- TYPE BLUEPRINT ---------------- */

  const startTypingBlueprint = (sections) => {

    let i = 0;

    setTypedSections([]);

    const interval = setInterval(() => {

      setTypedSections(prev => [...prev, sections[i]]);

      i++;

      if (i === sections.length) clearInterval(interval);

    }, 400);

  };

  /* ---------------- GENERATE ---------------- */

  const handleGenerate = async () => {

    if (!idea.trim()) return;

    const sections = generateBlueprint(idea);

    setBlueprintSections(sections);

    setIsGenerating(true);
    setCurrentStep(0);

    let step = 0;

    const interval = setInterval(() => {

      step++;

      if (step < generationSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
      }

    }, 700);

    startTypingBlueprint(sections);

    try {

      const res = await api.post("/projects", {

        title: idea.length > 30 ? idea.slice(0, 30) + "..." : idea,
        idea,

        sections: [
          { title: "Problem", description: "AI will generate this section." },
          { title: "Target Audience", description: "AI will generate this section." },
          { title: "Solution", description: "AI will generate this section." }
        ]

      });

      const newProject = res.data;

      setProjects(prev => [newProject, ...prev]);

      setTimeout(() => {

        navigate(`/dashboard/project/${newProject._id}`);

      }, 4000);

    } catch (err) {

      console.error(err);
      setIsGenerating(false);

    }

  };

  /* ---------------- ENTER KEY ---------------- */

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();
      handleGenerate();

    }

  };

  /* ---------------- PROMPT SUGGESTIONS ---------------- */

  const prompts = [

    "AI SaaS for doctors",
    "Portfolio website for designer",
    "Startup landing page for fintech app",
    "AI productivity tool for students"

  ];

  /* ---------------- CURSOR GLOW ---------------- */

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {

    const move = (e) => {

      setMouse({
        x: e.clientX,
        y: e.clientY
      });

    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);

  }, []);

  /* ---------------- UI ---------------- */

  return (

    <div className="relative w-full flex flex-col items-center overflow-hidden">

      {/* Cursor Glow */}

      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[120px] bg-indigo-600/20"
        style={{
          left: mouse.x - 250,
          top: mouse.y - 250
        }}
      />

      {/* Greeting */}

      <div className="text-center mt-16 mb-20">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-semibold"
        >

          Welcome back,

          <span className="text-indigo-400 ml-3">

            {userName}

          </span>

          <motion.span
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block ml-3"
          >

            👋

          </motion.span>

        </motion.h1>

        <p className="text-gray-400 mt-4">

          Describe your idea and let AI craft a stunning website instantly.

        </p>

      </div>

      {/* GENERATOR */}

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_60px_rgba(99,102,241,0.25)]">

        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your startup idea..."
          className="w-full h-36 p-5 rounded-xl bg-white/5 border border-indigo-500/40 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400"
        />

        {/* Prompt Suggestions */}

        <div className="flex flex-wrap gap-3 mt-4">

          {prompts.map((p, i) => (

            <button
              key={i}
              onClick={() => setIdea(p)}
              className="text-sm px-3 py-1 bg-white/5 border border-white/10 rounded-lg hover:border-indigo-400"
            >

              {p}

            </button>

          ))}

        </div>

        {isGenerating && (

          <div className="mt-8 space-y-6">

            <AIStreamingText text="Analyzing your idea and generating website structure..." />

            <div className="grid gap-3">

              {generationSteps.map((step, i) => (

                <FlowCard
                  key={i}
                  step={step}
                  index={i}
                  active={i === currentStep}
                />

              ))}

            </div>

          </div>

        )}

        <div className="flex justify-end mt-6">

          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transition"
          >

            ⚡ Generate Website

          </button>

        </div>

      </div>

      {/* AI TYPING BLUEPRINT */}

      {typedSections.length > 0 && (

        <div className="w-full max-w-5xl mt-16">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

            <h2 className="text-lg mb-4">

              AI Generated Structure

            </h2>

            <div className="space-y-3">

              {typedSections.map((s, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-white/5 rounded-lg border border-white/10"
                >

                  {s}

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      )}

      {/* STATS */}

      <div className="grid grid-cols-3 gap-6 mt-16 w-full max-w-5xl">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

          <p className="text-gray-400 text-sm">Projects</p>

          <h3 className="text-2xl mt-2">{projects.length}</h3>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

          <p className="text-gray-400 text-sm">Templates Used</p>

          <h3 className="text-2xl mt-2">12</h3>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

          <p className="text-gray-400 text-sm">AI Generations</p>

          <h3 className="text-2xl mt-2">{projects.length}</h3>

        </div>

      </div>

      {/* RECENT PROJECTS */}

      <div className="w-full max-w-5xl mt-20">

        <h2 className="text-xl mb-6">Recent Projects</h2>

        <div className="grid grid-cols-3 gap-6">

          {projects.map((project) => (

            <motion.div
              key={project._id}
              whileHover={{
                y: -8,
                boxShadow: "0 0 40px rgba(99,102,241,0.35)"
              }}
              onClick={() => navigate(`/dashboard/project/${project._id}`)}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer"
            >

              <h3 className="text-lg">

                {project.title}

              </h3>

              <p className="text-gray-400 text-sm mt-2">

                {new Date(project.createdAt).toLocaleDateString()}

              </p>

            </motion.div>

          ))}

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