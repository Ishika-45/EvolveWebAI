// src/App.jsx
import { Routes, Route } from "react-router-dom";  // ← Remove BrowserRouter import
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProjectDetails from "./pages/ProjectDetails";
import StartupBuilder from "./pages/StartupBuilder";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import ProjectPage from "./pages/ProjectPage";
import SocialSuccess from "./pages/SocialSuccess";

function App() {
  return (
    // ← REMOVE the <Router> wrapper completely
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 text-white overflow-hidden">
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            color: '#fff',
          },
        }}
      />

      {/* Background Glow Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 
                        w-[800px] h-[800px]
                        bg-indigo-500/15 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-[-200px] right-[-200px] 
                        w-[600px] h-[600px]
                        bg-purple-500/15 rounded-full blur-[140px] animate-pulse-glow" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 
                        w-[400px] h-[400px]
                        bg-pink-500/10 rounded-full blur-[120px] animate-pulse-glow" 
             style={{ animationDelay: '1s' }} />
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 -z-10
                      bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),
                          linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
                      bg-[size:50px_50px] pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Routes */}
      <AnimatePresence mode="wait">
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/social-success" element={<SocialSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<Projects />} />
              <Route path="templates" element={<Templates />} />
              <Route path="settings" element={<Settings />} />
              <Route path="project/:id" element={<ProjectDetails />} />
              <Route path="builder/:projectId" element={<StartupBuilder />} />
              <Route path="projects/:id" element={<ProjectPage />} />
            </Route>

            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AnimatePresence>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          75% { transform: translateY(10px) translateX(-5px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
    // ← REMOVE the closing </Router> tag
  );
}

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-400 mb-4">404</h1>
        <p className="text-gray-400 mb-6">Page not found</p>
        <a href="/" className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default App;