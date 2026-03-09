import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProjectDetails from "./pages/ProjectDetails";
import StartupBuilder from "./pages/StartupBuilder";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0f1117] text-white overflow-hidden">

  {/* Background Glow Layer */}
  <div className="absolute inset-0 -z-10">

    {/* Top Indigo Glow */}
    <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 
                    w-[800px] h-[800px]
                    bg-indigo-500/10 rounded-full blur-[140px]" />

    {/* Bottom Purple Glow */}
    <div className="absolute bottom-[-200px] right-[-200px] 
                    w-[600px] h-[600px]
                    bg-purple-500/10 rounded-full blur-[140px]" />

  </div>

  {/* Subtle Grid Overlay */}
  <div className="absolute inset-0 -z-10
                  bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
                      linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
                  bg-[size:40px_40px]" />

  {/* Routes */}
  <div className="relative z-10">
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="project/:id" element={<ProjectDetails />} />
        <Route path="builder/:projectId" element={<StartupBuilder />} />
      </Route>
    </Routes>
  </div>

</div>
    </Router>
  );
}

export default App;
