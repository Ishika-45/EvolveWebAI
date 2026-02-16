import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../services/api"

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await api.post("auth/register", {
        name,
        email,
        password,
      })

      alert("Registration successful! Please login.")
      navigate("/")
    } catch (error) {
      alert("Registration failed")
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
          Create Account
        </h1>

        <p style={{ textAlign: "center", marginBottom: "25px" }}>
          Start building AI websites today
        </p>

        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="primary">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }} className="muted">
          Already have an account?{" "}
          <span
            className="accent"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Register
