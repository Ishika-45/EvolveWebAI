import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

import AIStreamingText from "../components/AIStreamingText";
import FlowCard from "../components/FlowCard";
import AIGenerationModal from "../components/AIGenerationModal";

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
  "🧠 Understanding your idea",
  "🧩 Structuring layout architecture",
  "🎨 Designing interface components",
  "⚡ Optimizing responsiveness",
  "🚀 Finalizing your website",
];

const normalizeSection = (section, index = 0) => {
  if (typeof section === "string") {
    return {
      title: section.trim() || `Section ${index + 1}`,
      description: "",
    };
  }

  if (section && typeof section === "object") {
    return {
      title:
        section.title?.trim() ||
        section.name?.trim() ||
        section.heading?.trim() ||
        `Section ${index + 1}`,
      description:
        section.description?.trim() ||
        section.content?.trim() ||
        section.summary?.trim() ||
        "",
    };
  }

  return {
    title: `Section ${index + 1}`,
    description: "",
  };
};

const normalizeSections = (sections) => {
  if (!Array.isArray(sections) || sections.length === 0) {
    return FALLBACK_SECTIONS;
  }

  const normalized = sections
    .map((section, index) => normalizeSection(section, index))
    .filter((section) => section.title);

  return normalized.length ? normalized : FALLBACK_SECTIONS;
};

const startTypingSequence = (items, setter, delay = 400) => {
  if (!items?.length) return null;

  let i = 0;
  setter([]);

  const interval = setInterval(() => {
    setter((prev) => [...prev, items[i]]);
    i += 1;

    if (i >= items.length) {
      clearInterval(interval);
    }
  }, delay);

  return interval;
};

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
  const [streamingText, setStreamingText] = useState("");
  const [generateError, setGenerateError] = useState("");

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const stepIntervalRef = useRef(null);
  const typingIntervalRef = useRef(null);

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
    setBlueprintSections([]);
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
      const normalizedSections = normalizeSections(rawSections);

      setBlueprintSections(normalizedSections);

      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = startTypingSequence(
        normalizedSections,
        setTypedSections,
        350
      );

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
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[120px] bg-indigo-600/20"
        style={{
          left: mouse.x - 250,
          top: mouse.y - 250,
        }}
      />

      <div className="text-center mt-16 mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-semibold"
        >
          Welcome back,
          <span className="text-indigo-400 ml-3">{userName}</span>
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

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_60px_rgba(99,102,241,0.25)]">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your startup idea..."
          className="w-full h-36 p-5 rounded-xl bg-white/5 border border-indigo-500/40 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400"
        />

        {streamingText && (
          <div className="mt-6 bg-black/40 p-5 rounded-xl border border-indigo-500/30">
            <p className="text-indigo-300 mb-3">⚡ AI Generating Website Blueprint</p>
            <pre className="text-gray-300 whitespace-pre-wrap">{streamingText}</pre>
          </div>
        )}

        {generateError && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {generateError}
          </div>
        )}

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
                <FlowCard key={i} step={step} index={i} active={i === currentStep} />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
          >
            {isGenerating ? "Generating..." : "⚡ Generate Website"}
          </button>
        </div>
      </div>

      {typedSections.length > 0 && (
        <div className="w-full max-w-5xl mt-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg mb-4">AI Generated Structure</h2>

            <div className="space-y-3">
              {typedSections.map((section, i) => (
                <motion.div
                  key={`${section.title}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <p className="font-medium text-white">{section.title}</p>
                  {section.description ? (
                    <p className="text-sm text-gray-400 mt-1">{section.description}</p>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

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

      <div className="w-full max-w-5xl mt-20">
       <div className="flex justify-between items-center mb-6">
  <h2 className="text-xl">Recent Projects</h2>

  <button
    onClick={() => navigate("/dashboard/projects")}
    className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
  >
    View All
  </button>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project) => (
            <motion.div
              key={project._id}
              whileHover={{
                y: -8,
                boxShadow: "0 0 40px rgba(99,102,241,0.35)",
              }}
              onClick={() => navigate(`/dashboard/project/${project._id}`)}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer"
            >
              <h3 className="text-lg">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-2">
                {project.createdAt
                  ? new Date(project.createdAt).toLocaleDateString()
                  : "Recently created"}
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