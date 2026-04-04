import LandingNavbar from "../components/LandingNavbar";
import { useState, useEffect, useRef } from "react";

const Landing = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);
  
  const words = ["Intelligent", "Dynamic", "Interactive", "Revolutionary"];

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

  return (
    <>
      <LandingNavbar />
      
      {/* Canvas for particle background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -20 }} />
      
      {/* Advanced Gradient Background */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -10 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950" />
        
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-[120px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
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

      {/* Main Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 relative">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - TEXT with advanced animations */}
          <div className="space-y-8 relative">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-md border border-purple-500/30 rounded-full px-5 py-2.5" style={{
              animation: 'slideInLeft 0.8s ease-out forwards'
            }}>
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping" />
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full absolute top-0 animate-pulse" />
              </div>
              <span className="text-sm bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-semibold tracking-wide">
                🚀 NEXT-GEN AI PLATFORM
              </span>
            </div>

            {/* Main Heading with typewriter effect */}
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight" style={{
              animation: 'slideInRight 0.8s ease-out forwards'
            }}>
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
            </h1>

            {/* Description with fade-in */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg" style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
              animationDelay: '0.3s',
              opacity: 0
            }}>
              Describe your idea. Watch it transform into a live website.
              Modify. Collaborate. Evolve. All powered by cutting-edge AI.
            </p>

            {/* CTA Buttons with 3D effect */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4" style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
              animationDelay: '0.5s',
              opacity: 0
            }}>
              <button className="group relative px-9 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/40 font-bold text-white overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              </button>
              
              <button className="group px-9 py-4 border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-300 font-semibold backdrop-blur-sm hover:scale-105 hover:-translate-y-1 hover:border-purple-400">
                <span className="flex items-center gap-2">
                  Explore Demo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Enhanced Stats with counter animation */}
            <div className="flex gap-10 pt-8 border-t border-white/10" style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
              animationDelay: '0.7s',
              opacity: 0
            }}>
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  10K+
                </div>
                <div className="text-sm text-gray-400 mt-1">Websites Built</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  99.9%
                </div>
                <div className="text-sm text-gray-400 mt-1">Uptime SLA</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  24/7
                </div>
                <div className="text-sm text-gray-400 mt-1">Support</div>
              </div>
            </div>

            {/* Trusted by section */}
            <div className="pt-4" style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
              animationDelay: '0.9s',
              opacity: 0
            }}>
              <p className="text-xs text-gray-500 mb-3 tracking-wider">TRUSTED BY INNOVATIVE TEAMS</p>
              <div className="flex gap-6 opacity-50 hover:opacity-100 transition-opacity">
                {["Google", "Microsoft", "OpenAI", "Meta"].map((company, i) => (
                  <span key={i} className="text-sm font-semibold text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - 3D Interactive Preview */}
          <div 
            className="relative"
            style={{
              animation: 'slideInRight 0.8s ease-out forwards',
              animationDelay: '0.4s',
              opacity: 0
            }}
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
              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:shadow-3xl overflow-hidden">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                
                {/* Preview Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-purple-400 font-semibold flex items-center gap-2">
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

                {/* 3D Interactive Preview Content */}
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
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl" style={{
                        animation: 'float3D 3s ease-in-out infinite'
                      }} />
                      <div className="absolute inset-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg animate-pulse" />
                      <div className="absolute inset-4 bg-gray-900 rounded-md flex items-center justify-center">
                        <svg className="w-12 h-12 text-purple-400" style={{ animation: 'spin-slow 20s linear infinite' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                    </div>

                    {/* Animated Code Editor */}
                    <div className="w-full max-w-md space-y-3 px-6">
                      <div className="flex items-center gap-2 text-sm font-mono">
                        <span className="text-purple-400">&lt;div</span>
                        <span className="text-blue-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">"hero-section"</span>
                        <span className="text-purple-400">&gt;</span>
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-mono group/code">
                          <span className="text-purple-400">&lt;h1&gt;</span>
                          <span className="text-white bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent" style={{
                            backgroundSize: '200% auto',
                            animation: 'gradientShift 3s ease infinite'
                          }}>
                            AI-Powered Evolution
                          </span>
                          <span className="text-purple-400">&lt;/h1&gt;</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-mono">
                          <span className="text-purple-400">&lt;p&gt;</span>
                          <span className="text-gray-300 animate-pulse">Building the future of web development</span>
                          <span className="text-purple-400">&lt;/p&gt;</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-mono">
                          <span className="text-purple-400">&lt;button</span>
                          <span className="text-yellow-400">onClick</span>
                          <span className="text-gray-400">=</span>
                          <span className="text-green-400">"deploy()"</span>
                          <span className="text-purple-400">&gt;</span>
                          <span className="text-white">Deploy Now</span>
                          <span className="text-purple-400">&lt;/button&gt;</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm font-mono">
                        <span className="text-purple-400">&lt;/div&gt;</span>
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

                {/* Preview Footer with live indicators */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-green-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Live
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center gap-1 text-purple-400">
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

            {/* Enhanced Floating Elements */}
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

            <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-indigo-500/20 backdrop-blur-md rounded-full px-3 py-2 animate-pulse">
              <div className="w-2 h-2 bg-indigo-400 rounded-full" />
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2" style={{
              animation: 'scroll 1.5s ease-in-out infinite'
            }} />
          </div>
        </div>
      </section>

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
      `}</style>
    </>
  );
};

export default Landing;