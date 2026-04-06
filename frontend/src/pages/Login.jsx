import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight,
  Github,
  Chrome
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id
        })
      );
      toast.success("Welcome back to EvolveWeb AI ✨");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    setSocialLoading('github');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser = {
        token: "github-demo-token-123",
        name: "GitHub User",
        email: "github.user@example.com",
        _id: "github_123"
      };
      localStorage.setItem("token", mockUser.token);
      localStorage.setItem("user", JSON.stringify({
        name: mockUser.name,
        email: mockUser.email,
        _id: mockUser._id
      }));
      toast.success(`Welcome ${mockUser.name}! 🎉`);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("GitHub login failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading('google');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser = {
        token: "google-demo-token-456",
        name: "Google User",
        email: "google.user@gmail.com",
        _id: "google_456"
      };
      localStorage.setItem("token", mockUser.token);
      localStorage.setItem("user", JSON.stringify({
        name: mockUser.name,
        email: mockUser.email,
        _id: mockUser._id
      }));
      toast.success(`Welcome ${mockUser.name}! 🎉`);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  const checkStrength = (password) => {
    if (password.length < 6) {
      setStrength("Weak");
    } else if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.length >= 8
    ) {
      setStrength("Strong");
    } else {
      setStrength("Medium");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--theme-bgPrimary)' }}>
      {/* Animated gradient orbs that follow mouse */}
      <div 
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[var(--theme-accent)]/20 to-[var(--theme-gradient-end)]/20 rounded-full blur-[120px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-pink-600/20 to-[var(--theme-accent)]/20 rounded-full blur-[120px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
        }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(168, 85, 247, 0.05)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%" height="100%" fill="url(%23grid)"/%3E%3C/svg%3E')`
      }} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* LEFT SIDE - Brand Section */}
        <div className="hidden lg:flex flex-col justify-center px-12 xl:px-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[var(--theme-accent)] rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span className="text-sm text-[var(--theme-accent)] font-medium">⚡ Next-Gen AI Website Builder</span>
            </div>

            <h1 className="text-7xl xl:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--theme-gradient-start)] via-[var(--theme-accent)] to-[var(--theme-gradient-end)] bg-clip-text text-transparent">
                EvolveWeb
              </span>
              <span className="text-white"> AI</span>
            </h1>

            <p className="text-[var(--theme-textSecondary)] text-xl max-w-lg leading-relaxed mb-12">
              Build stunning websites in seconds using AI. Just describe your idea — we generate design, layout and production-ready code instantly.
            </p>

            <div className="space-y-4">
              {[
                { icon: "⚡", text: "AI-Powered Website Builder" },
                { icon: "🎨", text: "Modern Responsive Designs" },
                { icon: "🚀", text: "Instant Code Generation" },
                { icon: "🔒", text: "Enterprise-Grade Security" }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 text-gray-400 group cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{feature.icon}</span>
                  <span className="group-hover:text-[var(--theme-accent)] transition-colors">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[var(--theme-borderColor)] flex gap-8">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "50K+", label: "Websites Built" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[var(--theme-textSecondary)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl blur-xl opacity-30"
                style={{
                  background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                }}
              />
              
              <div className="relative bg-[var(--theme-cardBg)] backdrop-blur-2xl border border-[var(--theme-borderColor)] rounded-2xl p-8 transition-all duration-500 hover:border-[var(--theme-accent)]/40"
                style={{ boxShadow: `0 0 60px var(--theme-glow)` }}
              >
                
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome Back 👋</h2>
                  <p className="text-[var(--theme-textSecondary)]">Sign in to continue your journey</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="text-sm font-medium text-[var(--theme-textSecondary)] mb-2 block">
                      Email Address
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'email' ? 'text-[var(--theme-accent)]' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        required
                        value={email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] transition-all duration-300 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="text-sm font-medium text-[var(--theme-textSecondary)] mb-2 block">
                      Password
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'password' ? 'text-[var(--theme-accent)]' : 'text-gray-500'
                      }`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          checkStrength(e.target.value);
                        }}
                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] transition-all duration-300 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[var(--theme-accent)] transition-all duration-300 hover:scale-110"
                      >
                        {showPassword ? <span className="text-2xl">🙈</span> : <span className="text-2xl">🐵</span>}
                      </button>
                    </div>

                    <AnimatePresence>
                      {password && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-3"
                        >
                          <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ 
                                width: strength === "Weak" ? "33.33%" : strength === "Medium" ? "66.66%" : "100%",
                                backgroundColor: strength === "Weak" ? "#ef4444" : strength === "Medium" ? "#eab308" : "#22c55e"
                              }}
                              className="h-full rounded-full transition-all duration-500"
                            />
                          </div>
                          <p className={`text-xs mt-2 ${
                            strength === "Weak" ? "text-red-400" : strength === "Medium" ? "text-yellow-400" : "text-green-400"
                          }`}>
                            {strength} Password
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)] transition-colors"
                      onClick={() => toast.success("Password reset link sent to your email!")}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-3 rounded-xl text-white font-semibold overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[var(--theme-borderColor)]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGithubLogin}
                      disabled={socialLoading !== null}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] text-gray-300 hover:text-white hover:border-[var(--theme-accent)]/50 transition-all duration-300 relative overflow-hidden group"
                    >
                      {socialLoading === 'github' ? (
                        <div className="w-4 h-4 border-2 border-[var(--theme-accent)] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm">GitHub</span>
                        </>
                      )}
                      <div className="absolute inset-0 bg-[var(--theme-accent)]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={socialLoading !== null}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] text-gray-300 hover:text-white hover:border-[var(--theme-accent)]/50 transition-all duration-300 relative overflow-hidden group"
                    >
                      {socialLoading === 'google' ? (
                        <div className="w-4 h-4 border-2 border-[var(--theme-accent)] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm">Google</span>
                        </>
                      )}
                      <div className="absolute inset-0 bg-[var(--theme-accent)]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.button>
                  </div>

                  {/* Register Link */}
                  <p className="text-center text-[var(--theme-textSecondary)] text-sm mt-6">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/register")}
                      className="text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)] font-semibold hover:underline transition-all"
                    >
                      Create Account
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;