import LandingNavbar from "../components/LandingNavbar";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Landing = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  const words = ["Intelligent", "Dynamic", "Interactive", "Revolutionary"];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Typing effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        const timer = setTimeout(() => setCharIndex(charIndex - 1), 50);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    } else {
      if (charIndex < currentWord.length) {
        const timer = setTimeout(() => setCharIndex(charIndex + 1), 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timer);
      }
    }
    
    setTypedText(currentWord.substring(0, charIndex));
  }, [charIndex, isDeleting, wordIndex]);

  // Mouse and scroll tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.alpha})`;
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    resizeCanvas();
    createParticles();
    drawParticles();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const pricingPlans = {
    monthly: [
      {
        name: "Starter",
        price: "$29",
        description: "Perfect for individuals and small projects",
        features: ["3 AI projects", "Basic templates", "Email support", "Community access", "1 team member"],
        color: "purple",
        popular: false
      },
      {
        name: "Professional",
        price: "$79",
        description: "Best for freelancers and agencies",
        features: ["Unlimited AI projects", "Premium templates", "Priority support", "Advanced AI features", "5 team members", "Custom domain"],
        color: "pink",
        popular: true
      },
      {
        name: "Enterprise",
        price: "$199",
        description: "For large organizations with custom needs",
        features: ["Everything in Pro", "Dedicated support", "Custom AI training", "SLA guarantee", "Unlimited team members", "API access"],
        color: "indigo",
        popular: false
      }
    ],
    yearly: [
      {
        name: "Starter",
        price: "$290",
        description: "Perfect for individuals and small projects",
        features: ["3 AI projects", "Basic templates", "Email support", "Community access", "1 team member"],
        color: "purple",
        popular: false
      },
      {
        name: "Professional",
        price: "$790",
        description: "Best for freelancers and agencies",
        features: ["Unlimited AI projects", "Premium templates", "Priority support", "Advanced AI features", "5 team members", "Custom domain"],
        color: "pink",
        popular: true
      },
      {
        name: "Enterprise",
        price: "$1990",
        description: "For large organizations with custom needs",
        features: ["Everything in Pro", "Dedicated support", "Custom AI training", "SLA guarantee", "Unlimited team members", "API access"],
        color: "indigo",
        popular: false
      }
    ]
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "EvolveWeb AI transformed how we build websites. What used to take weeks now takes hours!",
      avatar: "SJ",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      content: "The AI templates are incredible. My clients are always impressed with the quality and speed.",
      avatar: "MC",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content: "Best investment for our team. The AI workspace is intuitive and powerful.",
      avatar: "ER",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      content: "Finally a tool that understands what creators need. Absolutely game-changing!",
      avatar: "DK",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=4"
    }
  ];

  const faqs = [
    {
      q: "What exactly is EvolveWeb AI?",
      a: "EvolveWeb AI is an AI-powered web builder that helps you create stunning websites using natural language prompts and premium templates."
    },
    {
      q: "Do I need coding skills?",
      a: "Not at all! Our AI does all the heavy lifting. Just describe what you want, and watch it come to life."
    },
    {
      q: "Can I export my website?",
      a: "Yes! You can export HTML/CSS/JS code or deploy directly from our platform."
    },
    {
      q: "Is there a free trial?",
      a: "Yes, we offer a 14-day free trial on all plans. No credit card required."
    }
  ];

  // Smooth scroll function for navigation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Height of fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <LandingNavbar />
      
      {/* Canvas for particle background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -20 }} />
      
      {/* Advanced Gradient Background */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -10 }}>
       <div className="absolute inset-0" style={{ backgroundColor: 'var(--theme-bgPrimary)' }} />
        
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
             background: `radial-gradient(circle, var(--theme-accent)/20, transparent)`
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-pink-600/20 to-purple-600/20 rounded-full blur-[120px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(168, 85, 247, 0.05)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%" height="100%" fill="url(%23grid)"/%3E%3C/svg%3E')`
        }} />
      </div>

      {/* Main Hero Section - FIXED: Added pt-32 to prevent navbar overlap */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative"
        id="hero"
      >
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - TEXT with advanced animations */}
          <div className="space-y-8 relative">
            {/* Animated badge */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-md border border-purple-500/30 rounded-full px-5 py-2.5"
            >
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping" />
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full absolute top-0 animate-pulse" />
              </div>
              <span className="text-sm bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-semibold tracking-wide">
                🚀 NEXT-GEN AI PLATFORM
              </span>
            </motion.div>

            {/* Main Heading with typewriter effect */}
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl lg:text-8xl font-bold leading-tight"
            >
              Evolve Your
              <br />
              Ideas Into{" "}
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent" style={{
                  backgroundSize: '200% auto',
                  animation: 'gradientShift 3s ease infinite'
                }}>
                  {typedText}
                  <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
                </span>
                {/* Animated underline */}
                <svg className="absolute -bottom-4 left-0 w-full h-4 -z-0" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path 
                    d="M0 5 L100 5" 
                    stroke="url(#gradient)" 
                    strokeWidth="2" 
                    strokeDasharray="10 10"
                    style={{ animation: 'dash 1s linear infinite' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              Websites
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              Describe your idea. Watch it transform into a live website.
              Modify. Collaborate. Evolve. All powered by cutting-edge AI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="group relative px-9 py-4 bg-gradient-to-r linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 font-bold text-white overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-9 py-4 border-2 border-purple-500/50 text-[var(--theme-accent)] hover:bg-purple-500/10 rounded-xl transition-all duration-300 font-semibold backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  Explore Demo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-10 pt-8 border-t border-white/10"
            >
              {[
                { value: "10K+", label: "Websites Built" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "24/7", label: "Support" }
              ].map((stat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Trusted by */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4"
            >
              <p className="text-xs text-gray-500 mb-3 tracking-wider">TRUSTED BY INNOVATIVE TEAMS</p>
              <div className="flex gap-6 opacity-50 hover:opacity-100 transition-opacity">
                {["Google", "Microsoft", "OpenAI", "Meta"].map((company, i) => (
                  <span key={i} className="text-sm font-semibold text-gray-400 hover:text-[var(--theme-accent)] transition-colors cursor-pointer">
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - 3D Interactive Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 3D Rotating Orbs */}
            <div className="absolute -top-32 -right-32 w-96 h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-full blur-3xl" style={{
                animation: 'orbit 12s linear infinite'
              }} />
              <div className="absolute inset-0 bg-gradient-to-l from-pink-600/30 to-purple-600/30 rounded-full blur-3xl" style={{
                animation: 'orbit-reverse 12s linear infinite',
                animationDelay: '1s'
              }} />
            </div>

            {/* Main Interactive Card */}
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) rounded-2xl blur-xl transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                
                {/* Preview Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-[var(--theme-accent)] font-semibold flex items-center gap-2">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping" />
                      <div className="w-2.5 h-2.5 bg-purple-400 rounded-full absolute top-0" />
                    </div>
                    Live Website Preview
                  </h3>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" />
                  </div>
                </div>

                {/* Preview Content */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm">
                  <div 
                    className={`h-96 flex flex-col items-center justify-center transition-all duration-700 transform-gpu ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                      transform: `perspective(1000px) rotateX(${isHovered ? '5deg' : '0deg'}) rotateY(${mousePosition.x * 0.01}deg)`,
                    }}
                  >
                    {/* Animated 3D Cube */}
                    <div className="relative w-32 h-32 mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) rounded-xl" style={{
                        animation: 'float3D 3s ease-in-out infinite'
                      }} />
                      <div className="absolute inset-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg animate-pulse" />
                      <div className="absolute inset-4 bg-gray-900 rounded-md flex items-center justify-center">
                        <svg className="w-12 h-12 text-[var(--theme-accent)] animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                    </div>

                    {/* Animated Code Editor */}
                    <div className="w-full max-w-md space-y-3 px-6">
                      <div className="flex items-center gap-2 text-sm font-mono">
                        <span className="text-[var(--theme-accent)]">&lt;div</span>
                        <span className="text-blue-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">"hero-section"</span>
                        <span className="text-[var(--theme-accent)]">&gt;</span>
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-mono group/code">
                          <span className="text-[var(--theme-accent)]">&lt;h1&gt;</span>
                          <span className="text-white bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent" style={{
                            backgroundSize: '200% auto',
                            animation: 'gradientShift 3s ease infinite'
                          }}>
                            AI-Powered Evolution
                          </span>
                          <span className="text-[var(--theme-accent)]">&lt;/h1&gt;</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-mono">
                          <span className="text-[var(--theme-accent)]">&lt;p&gt;</span>
                          <span className="text-gray-300 animate-pulse">Building the future of web development</span>
                          <span className="text-[var(--theme-accent)]">&lt;/p&gt;</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-mono">
                          <span className="text-[var(--theme-accent)]">&lt;button</span>
                          <span className="text-yellow-400">onClick</span>
                          <span className="text-gray-400">=</span>
                          <span className="text-green-400">"deploy()"</span>
                          <span className="text-[var(--theme-accent)]">&gt;</span>
                          <span className="text-white">Deploy Now</span>
                          <span className="text-[var(--theme-accent)]">&lt;/button&gt;</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm font-mono">
                        <span className="text-[var(--theme-accent)]">&lt;/div&gt;</span>
                      </div>
                    </div>

                    {/* Loading bar animation */}
                    <div className="w-64 mt-6 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{
                        animation: 'loadingBar 2s ease-in-out infinite'
                      }} />
                    </div>
                  </div>
                </div>

                {/* Preview Footer */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-green-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Live
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center gap-1 text-[var(--theme-accent)]">
                      <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      AI Generating
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs font-mono">
                    127ms latency
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 to-indigo-500 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-mono text-white shadow-lg" style={{
              animation: 'float3D 3s ease-in-out infinite'
            }}>
              <div className="flex items-center gap-2">
                <span>✨</span>
                <span>AI Engine Active</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-pink-500 to-purple-500 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-mono text-white shadow-lg" style={{
              animation: 'float3D 3s ease-in-out infinite',
              animationDelay: '0.7s'
            }}>
              <div className="flex items-center gap-2">
                <span>🚀</span>
                <span>Ready to Deploy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2" style={{
              animation: 'scroll 1.5s ease-in-out infinite'
            }} />
          </div>
        </div>
      </motion.section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 px-6 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--theme-accent)] uppercase tracking-wider">
              Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Everything you need to{" "}
              <span className="gradient-text">build faster</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to create stunning websites in record time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🤖", title: "AI-Powered Generation", desc: "Generate complete website sections with simple text prompts", color: "purple" },
              { icon: "🎨", title: "Premium Templates", desc: "Access hundreds of professionally designed templates", color: "pink" },
              { icon: "⚡", title: "Real-time Preview", desc: "See changes instantly as you build your website", color: "blue" },
              { icon: "🔧", title: "Custom Components", desc: "Build and reuse your own component library", color: "green" },
              { icon: "📱", title: "Responsive Design", desc: "Websites look perfect on all devices", color: "orange" },
              { icon: "🚀", title: "One-Click Deploy", desc: "Deploy your site to production instantly", color: "red" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 group cursor-pointer relative overflow-hidden"
              >
                <div className={`text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-pink-600/0 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--theme-accent)] uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              How{" "}
              <span className="gradient-text">EvolveWeb AI</span> Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Describe", desc: "Tell our AI what kind of website you want to build", icon: "💭", color: "purple" },
              { step: "02", title: "Generate", desc: "Watch as AI creates your website in real-time", icon: "✨", color: "pink" },
              { step: "03", title: "Launch", desc: "Deploy your website with one click", icon: "🚀", color: "indigo" },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center relative"
              >
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/3 -right-6 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                )}
                <div className={`text-7xl font-bold text-black-500/20 mb-4`}>{step.step}</div>
                <div className="text-5xl mb-4 transform hover:scale-110 transition-transform duration-300 inline-block">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--theme-accent)] uppercase tracking-wider">
              Pricing Plans
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Choose the{" "}
              <span className="gradient-text">perfect plan</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Start free and upgrade when you're ready. No hidden fees.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  selectedPlan === "monthly" 
                    ? "bg-gradient-to-r linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  selectedPlan === "yearly" 
                    ? "bg-gradient-to-r linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans[selectedPlan].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative glass-card p-8 group ${
                  plan.popular ? "border-purple-500/50 shadow-2xl shadow-purple-500/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}
                    <span className="text-base text-gray-400">/{selectedPlan === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button 
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/register")}
  className="group relative px-9 py-4 bg-gradient-to-r linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 font-bold text-white overflow-hidden"
>
  <span className="relative z-10 flex items-center gap-2">
    Get Started
    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </span>
</motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-24 px-6 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--theme-accent)] uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Loved by{" "}
              <span className="gradient-text">creators worldwide</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredTestimonial(idx)}
                onHoverEnd={() => setHoveredTestimonial(null)}
                className="glass-card p-6 cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: hoveredTestimonial === idx ? 1 : 0, scale: hoveredTestimonial === idx ? 1 : 0 }}
                  className="mt-4 flex justify-end"
                >
                  <svg className="w-8 h-8 text-[var(--theme-accent)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 relative scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--theme-accent)] uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 group cursor-pointer hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
                  {faq.q}
                </h3>
                <p className="text-gray-400">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to{" "}
                <span className="gradient-text">Evolve</span> your web presence?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are building amazing websites with EvolveWeb AI
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="px-8 py-4 bg-gradient-to-r linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end)) rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Building for Free →
              </motion.button>
              <p className="text-xs text-gray-500 mt-4">No credit card required • 14-day free trial</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold gradient-text mb-4">EvolveWeb AI</h3>
              <p className="text-gray-400 text-sm mb-4">
                Building the future of web development with cutting-edge AI technology.
              </p>
              <div className="flex gap-4">
                {["twitter", "github", "linkedin", "discord"].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-[var(--theme-accent)] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition-all">
                      <span className="text-sm">{social[0].toUpperCase()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Pricing", "Templates", "Integrations"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Support", "Community"] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href="#" className="text-gray-400 hover:text-[var(--theme-accent)] transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>&copy; 2024 EvolveWeb AI. All rights reserved. Built with 🚀 for the future.</p>
          </div>
        </div>
      </footer>

      {/* Add global styles */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float3D {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(10px) rotate(-2deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          from { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
          to { transform: rotate(0deg) translateX(50px) rotate(0deg); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
        
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
       .glass-card {
  background: var(--theme-cardBg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--theme-borderColor);
  border-radius: 1.5rem;
}
        
        .gradient-text {
  background: linear-gradient(135deg, var(--theme-gradient-start) 0%, var(--theme-gradient-end) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

        /* Scroll margin for fixed navbar */
        .scroll-mt-20 {
          scroll-margin-top: 80px;
        }
      `}</style>
    </>
  );
};

export default Landing;