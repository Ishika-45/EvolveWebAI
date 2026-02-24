import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div style={{ display: "flex", height: "100vh", color: "white" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "rgba(20,20,20,0.6)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <h2 style={{
            background: "linear-gradient(90deg,#a78bfa,#6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            EvolveWeb AI
          </h2>

          <div style={{ marginTop: "40px" }}>
            <p style={{ marginBottom: "20px", cursor: "pointer" }}>🏠 Dashboard</p>
            <p style={{ marginBottom: "20px", cursor: "pointer" }}>📁 Projects</p>
            <p style={{ marginBottom: "20px", cursor: "pointer" }}>⚙ Settings</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "10px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Topbar */}
        <div
          style={{
            height: "70px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
            background: "rgba(20,20,20,0.4)",
            backdropFilter: "blur(20px)"
          }}
        >
          <h3>Dashboard</h3>
          <div>👤 User</div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ padding: "40px" }}
        >
          <h1>Welcome to your Dashboard 🚀</h1>
          <p style={{ marginTop: "10px", opacity: 0.7 }}>
            Start building AI powered websites.
          </p>
        </motion.div>

      </div>
    </div>
  )
}

export default Dashboard
