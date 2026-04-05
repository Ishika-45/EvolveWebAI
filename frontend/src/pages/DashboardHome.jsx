import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Layers, 
  Zap,
  Star,
  Code,
  Rocket,
  Loader2,
  Folder
} from "lucide-react";
import api from "../services/api";

const FALLBACK_SECTIONS = [
  { title: "Hero Section", description: "A strong hero area introducing the product and value proposition." },
  { title: "Problem Section", description: "Highlight the core pain points users face." },
  { title: "Solution Section", description: "Explain how the product solves the identified problem." },
  { title: "Features", description: "Showcase the main product features and benefits." },
  { title: "Pricing", description: "Present pricing tiers or monetization details clearly." },
  { title: "Testimonials", description: "Build trust through social proof and user feedback." },
  { title: "CTA", description: "Drive action with a compelling call to action." },
  { title: "Footer", description: "Include navigation, links, and essential footer content." },
];

const generationSteps = [
  { icon: "🧠", title: "Understanding your idea", desc: "Analyzing requirements and goals" },
  { icon: "🧩", title: "Structuring layout", desc: "Creating optimal information architecture" },
  { icon: "🎨", title: "Designing components", desc: "Applying modern design patterns" },
  { icon: "⚡", title: "Optimizing performance", desc: "Ensuring fast load times" },
  { icon: "🚀", title: "Finalizing", desc: "Preparing your website for launch" },
];

const DashboardHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [idea, setIdea] = useState("");
  const [projects, setProjects] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [typedSections, setTypedSections] = useState([]);
  const [userName, setUserName] = useState("User");
  const [streamingText, setStreamingText] = useState("");
  const [generateError, setGenerateError] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const stepIntervalRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Calculate stats
  const totalProjects = projects.length;
  const aiGenerations = projects.length * 3;
  const productivityScore = 94;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const parsedUser = JSON.parse(storedUser);
      const displayName = parsedUser?.name || parsedUser?.email || "User";
      const firstName = displayName.split(" ")[0];
      setUserName(firstName);
    } catch (error) {
      console.error("Failed to parse stored user:", error);
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        const projectsData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.projects)
          ? res.data.projects
          : [];

        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, [location]);

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    return () => {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const prompts = [
    "AI SaaS for doctors",
    "Portfolio website for designer",
    "Startup landing page for fintech app",
    "AI productivity tool for students",
  ];

  const beginStepAnimation = () => {
    if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);

    let step = 0;
    setCurrentStep(0);

    stepIntervalRef.current = setInterval(() => {
      step += 1;

      if (step < generationSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(stepIntervalRef.current);
      }
    }, 700);
  };

  const streamGenerationText = async (promptIdea) => {
    const response = await fetch("http://localhost:5000/api/ai/generate-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ idea: promptIdea }),
    });

    if (!response.ok) {
      throw new Error(`Streaming failed with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Streaming response body is missing");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      result += chunk;
      setStreamingText(result);
    }

    return result;
  };

  const handleGenerate = async () => {
    if (!idea.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerateError("");
    setStreamingText("");
    setTypedSections([]);

    beginStepAnimation();

    try {
      try {
        await streamGenerationText(idea);
      } catch (streamError) {
        console.error("Streaming error:", streamError);
      }

      const aiRes = await api.post("/ai/generate-website", { idea });
      const rawSections = aiRes.data?.sections;
      
      // Normalize sections safely
      let normalizedSections = [];
      if (Array.isArray(rawSections) && rawSections.length > 0) {
        normalizedSections = rawSections.map((section, index) => {
          if (typeof section === "string") {
            return { title: section.trim() || `Section ${index + 1}`, description: "" };
          }
          if (section && typeof section === "object") {
            return {
              title: section.title?.trim() || section.name?.trim() || section.heading?.trim() || `Section ${index + 1}`,
              description: section.description?.trim() || section.content?.trim() || section.summary?.trim() || "",
            };
          }
          return { title: `Section ${index + 1}`, description: "" };
        });
      } else {
        normalizedSections = FALLBACK_SECTIONS;
      }

      // Filter out any invalid sections
      normalizedSections = normalizedSections.filter(section => section && section.title);

      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      
      // Type out sections one by one
      let i = 0;
      setTypedSections([]);
      
      const interval = setInterval(() => {
        if (i < normalizedSections.length) {
          setTypedSections(prev => [...prev, normalizedSections[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 350);
      
      typingIntervalRef.current = interval;

      const payload = {
        title: idea.length > 30 ? `${idea.slice(0, 30)}...` : idea,
        idea: idea.trim(),
        sections: normalizedSections,
      };

      const res = await api.post("/projects", payload);
      const newProject = res.data?.project || res.data;

      if (!newProject?._id) {
        throw new Error("Project was created but no project id was returned");
      }

      setProjects((prev) => [newProject, ...prev]);

      setTimeout(() => {
        navigate(`/dashboard/project/${newProject._id}`);
      }, 500);
    } catch (error) {
      console.error("Generation error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while generating your project.";

      setGenerateError(message);
    } finally {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      setCurrentStep(generationSteps.length - 1);
      setTimeout(() => setIsGenerating(false), 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden">
      {/* Animated Cursor Glow */}
      <div
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full blur-[100px] bg-purple-600/15 transition-transform duration-300"
        style={{
          left: mouse.x - 200,
          top: mouse.y - 200,
        }}
      />

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300">AI-Powered Website Builder</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold"
        >
          Welcome back,
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent ml-3">
            {userName}
          </span>
          <motion.span
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block ml-2"
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-3 max-w-2xl mx-auto"
        >
          Describe your idea and let AI craft a stunning, production-ready website in seconds
        </motion.p>
      </div>

      {/* AI Generator Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-4xl relative mb-12"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-30" />
        
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">AI Website Generator</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Active</span>
          </div>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your startup idea, business, or website concept..."
            className="w-full h-32 p-5 rounded-xl bg-black/30 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all resize-none"
          />

          {/* Prompt Suggestions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => setIdea(p)}
                className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Streaming Text */}
          <AnimatePresence>
            {streamingText && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 bg-black/40 p-5 rounded-xl border border-purple-500/30"
              >
                <p className="text-purple-300 text-sm mb-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI Generating Website Blueprint
                </p>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">{streamingText}</pre>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {generateError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
              >
                <p className="text-sm text-red-300">{generateError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generation Steps */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-3"
              >
                {generationSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      i === currentStep
                        ? "bg-purple-500/20 border border-purple-500/30"
                        : i < currentStep
                        ? "bg-green-500/10 border border-green-500/30 opacity-60"
                        : "bg-white/5 border border-white/10 opacity-40"
                    }`}
                  >
                    <div className="text-2xl">{step.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{step.title}</p>
                      <p className="text-xs text-gray-400">{step.desc}</p>
                    </div>
                    {i < currentStep && (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {i === currentStep && (
                      <div className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate Button */}
          <div className="flex justify-end mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating || !idea.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Website
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-12"
      >
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <Folder className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                +{totalProjects}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">{totalProjects}</h3>
            <p className="text-xs text-gray-500 mt-1">Total Projects</p>
          </div>
        </div>

        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-pink-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-pink-500/20">
                <Layers className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                +8
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">12</h3>
            <p className="text-xs text-gray-500 mt-1">Templates Used</p>
          </div>
        </div>

        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-blue-500/20">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                +{aiGenerations}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">{aiGenerations}</h3>
            <p className="text-xs text-gray-500 mt-1">AI Generations</p>
          </div>
        </div>

        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-green-500/20">
                <Star className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                +15%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">{productivityScore}%</h3>
            <p className="text-xs text-gray-500 mt-1">Productivity Score</p>
          </div>
        </div>
      </motion.div>

      {/* Generated Structure Preview - FIXED: Added safety check */}
      <AnimatePresence>
        {typedSections && typedSections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  AI Generated Structure
                </h3>
                <span className="text-xs text-purple-400">{typedSections.length} sections</span>
              </div>

              <div className="space-y-3">
                {typedSections.map((section, i) => (
                  <motion.div
                    key={`${section?.title || i}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-white group-hover:text-purple-400 transition-colors">
                          {section?.title || `Section ${i + 1}`}
                        </p>
                        {section?.description && (
                          <p className="text-sm text-gray-400 mt-1">{section.description}</p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Projects Section */}
      {projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-6xl mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
              <p className="text-sm text-gray-500 mt-1">Continue where you left off</p>
            </div>
            <button
              onClick={() => navigate("/dashboard/projects")}
              className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/dashboard/project/${project._id}`)}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-xl bg-purple-500/20">
                      <Folder className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Recent"}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors mb-2 line-clamp-1">
                    {project.title || "Untitled Project"}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {project.idea || "AI-generated website project"}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400">Ready to edit</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-4xl mb-8"
      >
        <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Pro Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <span className="text-purple-400">✨</span>
              <p className="text-xs text-gray-300">Be specific about your industry and target audience</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">🎨</span>
              <p className="text-xs text-gray-300">Mention preferred color schemes or design styles</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">🚀</span>
              <p className="text-xs text-gray-300">Include key features you want to highlight</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;