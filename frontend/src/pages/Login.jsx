import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
// import AiAnimation from "../components/AiAnimation";
import BrandPulse from "../components/BrandPulse";
import BrandMotion from "../components/BrandMotion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back to EvolveWeb AI ✨");

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }

    setLoading(false);
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
    <div className="min-h-screen animated-bg relative grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* Floating Blobs */}
  <div className="blob blob-purple"></div>
  <div className="blob blob-indigo"></div>

      
      {/* LEFT SIDE */}

      {/* <div
  style={{
    filter: "drop-shadow(0 0 20px var(--glow))"
  }}
    
>
  <AiAnimation />
</div>
       */}
      <div className="hidden md:flex flex-col justify-center px-20 relative z-10 
">
  {/* <BrandMotion /> */}

  <div className="inline-flex items-center gap-2 
                px-4 py-1.5 
                rounded-full 
                bg-white/5 
                border border-white/10
                text-sm text-purple-300
                backdrop-blur-md
                mb-6">

  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
  ⚡ Next-Gen AI Website Builder
</div>

        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-8">
          EvolveWeb AI
        </h1>

        <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
          Build stunning websites in seconds using AI.
          Just describe your idea — we generate design,
          layout and production-ready code instantly.
        </p>

        <div className="mt-12 space-y-4 text-gray-400 text-md">
          <p>⚡ AI-Powered Website Builder</p>
          <p>🎨 Modern Responsive Designs</p>
          <p>🚀 Instant Code Generation</p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-md p-8 rounded-2xl
           bg-white/5 backdrop-blur-xl
           border border-white/10
           transition-all duration-500
           hover:border-purple-500/40
           hover:shadow-[0_0_60px_rgba(99,102,241,0.35)]"
        >

          <h2 className="text-2xl font-semibold text-white mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg
                           bg-white/5 border border-white/10
                           focus:outline-none focus:border-purple-500
                           focus:ring-1 focus:ring-purple-500
                           transition text-white"
              />
            </div>

            <div className="relative">
  <label className="text-sm text-gray-300">Password</label>

  <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
   onChange={(e) => {
  setPassword(e.target.value);
  checkStrength(e.target.value);
}}

    className="w-full mt-2 px-4 py-3 pr-12 rounded-lg
               bg-white/5 border border-white/10
               focus:outline-none focus:border-purple-500
               focus:ring-1 focus:ring-purple-500
               transition text-white"
  />
  {password && (
  <div className="mt-3">
    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-2 transition-all duration-500 ${
          strength === "Weak"
            ? "w-1/3 bg-red-500"
            : strength === "Medium"
            ? "w-2/3 bg-yellow-500"
            : "w-full bg-green-500"
        }`}
      ></div>
    </div>

    <p
      className={`text-xs mt-2 ${
        strength === "Weak"
          ? "text-red-400"
          : strength === "Medium"
          ? "text-yellow-400"
          : "text-green-400"
      }`}
    >
      {strength} Password
    </p>
  </div>
)}


  {/* Toggle Button */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-[38px] text-gray-400 hover:text-purple-400 transition"
  >
    {showPassword ? "🙈" : "👁"}
  </button>
</div>


            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg
                         bg-gradient-to-r from-purple-500 to-indigo-500
                         font-semibold text-white
                         hover:opacity-90 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-400 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
