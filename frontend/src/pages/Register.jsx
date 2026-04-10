import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Github,
  Chrome
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^A-Za-z0-9]/)) score++;
    
    if (score <= 2) setStrength("Weak");
    else if (score <= 4) setStrength("Medium");
    else setStrength("Strong");
  };

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailValid(isValid);
    return isValid;
  };

  const validateName = (name) => {
    const isValid = name.length >= 2;
    setNameValid(isValid);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
          provider: "local"
        })
      );
      toast.success("Account created successfully 🚀");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  // Social login handlers
  const handleGoogleRegister = () => {
    toast.loading("Redirecting to Google...", { duration: 2000 });
    // Small delay to show toast before redirect
    setTimeout(() => {
      window.location.href = "http://localhost:5000/auth/google";
    }, 500);
  };

  const handleGithubRegister = () => {
    toast.loading("Redirecting to GitHub...", { duration: 2000 });
    // Small delay to show toast before redirect
    setTimeout(() => {
      window.location.href = "http://localhost:5000/auth/github";
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--theme-bgPrimary)' }}>
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[var(--theme-accent)]/20 to-[var(--theme-gradient-end)]/20 rounded-full blur-[120px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          opacity: 0.35,
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span className="text-sm text-[var(--theme-accent)] font-medium">✨ Join the Future of Web Creation</span>
            </div>

            <h1 className="text-7xl xl:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--theme-gradient-start)] via-[var(--theme-accent)] to-[var(--theme-gradient-end)] bg-clip-text text-transparent">
                Start Your
              </span>
              <br />
              <span className="text-white">Journey Today</span>
            </h1>

            <p className="text-[var(--theme-textSecondary)] text-xl max-w-lg leading-relaxed mb-12">
              Join thousands of creators building amazing websites with cutting-edge AI technology.
            </p>

            <div className="space-y-6">
              {[
                { icon: "✨", text: "AI-Powered Website Generation", desc: "Create stunning sites with simple prompts" },
                { icon: "🎨", text: "Premium Templates", desc: "Access hundreds of professional designs" },
                { icon: "⚡", text: "Lightning Fast", desc: "Generate and deploy in minutes" }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold group-hover:text-[var(--theme-accent)] transition-colors">{feature.text}</p>
                    <p className="text-[var(--theme-textSecondary)] text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-[var(--theme-borderColor)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)] border-2 border-gray-950 flex items-center justify-center text-xs font-bold text-white">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-300">Join <span className="text-[var(--theme-accent)] font-semibold">10,000+</span> creators</p>
                  <p className="text-xs text-[var(--theme-textSecondary)]">Already building with EvolveWeb AI</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Register Form */}
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
                  <h2 className="text-3xl font-bold text-white mb-2">Create Account ✨</h2>
                  <p className="text-[var(--theme-textSecondary)]">Start building amazing websites with AI</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="text-sm font-medium text-[var(--theme-textSecondary)] mb-2 block">
                      Full Name
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focusedField === 'name' ? 'text-[var(--theme-accent)]' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        required
                        value={name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => {
                          setFocusedField(null);
                          validateName(name);
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                          validateName(e.target.value);
                        }}
                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] transition-all duration-300 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20"
                        placeholder="John Doe"
                      />
                      <AnimatePresence>
                        {name && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {nameValid ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

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
                        onBlur={() => {
                          setFocusedField(null);
                          validateEmail(email);
                        }}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          validateEmail(e.target.value);
                        }}
                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] transition-all duration-300 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20"
                        placeholder="you@example.com"
                      />
                      <AnimatePresence>
                        {email && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {emailValid ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                        )}
                      </AnimatePresence>
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
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[var(--theme-accent)] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

                  {/* Terms and Conditions */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-[var(--theme-accent)] focus:ring-[var(--theme-accent)] focus:ring-offset-0"
                    />
                    <label htmlFor="terms" className="text-sm text-[var(--theme-textSecondary)]">
                      I agree to the{" "}
                      <button type="button" className="text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)]">
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button type="button" className="text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)]">
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !nameValid || !emailValid || !agreeToTerms}
                    className="relative w-full py-3 rounded-xl text-white font-semibold overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Sign Up
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

                  {/* Social Signup - NOW WITH WORKING LINKS */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGithubRegister}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] text-gray-300 hover:text-white hover:border-[var(--theme-accent)]/50 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGoogleRegister}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-[var(--theme-borderColor)] text-gray-300 hover:text-white hover:border-[var(--theme-accent)]/50 transition-all duration-300"
                    >
                      <Chrome className="w-4 h-4" />
                      <span className="text-sm">Google</span>
                    </motion.button>
                  </div>

                  {/* Login Link */}
                  <p className="text-center text-[var(--theme-textSecondary)] text-sm mt-6">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)] font-semibold hover:underline transition-all"
                    >
                      Sign In
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

export default Register;