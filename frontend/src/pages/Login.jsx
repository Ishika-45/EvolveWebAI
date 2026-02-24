import { motion } from "framer-motion"
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../services/api"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", res.data.token)

toast.success("Welcome back to EvolveWeb AI ✨", {
  duration: 3000,
})


setTimeout(() => {
  navigate("/dashboard")
}, 1000)

    } catch (error) {
      toast.error(
  error.response?.data?.message || "Invalid credentials"
)

    }

    setLoading(false)
  }

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}
  >
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "6px",
          background: "linear-gradient(90deg,#a78bfa,#6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        EvolveWeb AI
      </h1>

      <p style={{ textAlign: "center", marginBottom: "25px" }}>
        Build websites with AI in seconds
      </p>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primary">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center" }} className="muted">
        Don’t have an account?{" "}
        <span
          className="accent"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </motion.div>
  </motion.div>
)

}

export default Login
