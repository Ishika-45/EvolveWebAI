import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { motion } from "framer-motion"
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function App() {
  return (

     <>
      <Toaster
  position="top-right"
  toastOptions={{
    success: {
      style: {
        background: "rgba(99,102,241,0.15)",
        color: "#fff",
        border: "1px solid rgba(99,102,241,0.4)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
      },
      iconTheme: {
        primary: "#6366f1",
        secondary: "#fff",
      },
    },
    error: {
      style: {
        background: "rgba(239,68,68,0.15)",
        color: "#fff",
        border: "1px solid rgba(239,68,68,0.4)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>


      
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
      </>
  )
}

export default App
