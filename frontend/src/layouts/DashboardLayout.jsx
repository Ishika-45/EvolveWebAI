import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Folder,
  Sparkles,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: Folder, path: "/dashboard/projects" },
    { name: "Templates", icon: Sparkles, path: "/dashboard/templates" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden
                bg-[#0f172a]">
  
  {/* Grid Overlay */}
 <div className="absolute inset-0 animated-grid
  bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
      linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
  bg-[size:40px_40px]
  pointer-events-none" />

  {/* Radial Glow */}
  <div className="absolute top-[-200px] left-1/2 -translate-x-1/2
                  w-[900px] h-[900px]
                  bg-indigo-500/15 blur-[160px]
                  rounded-full pointer-events-none" />
                  
                  <div className="absolute w-3 h-3 bg-indigo-400/40 rounded-full
                top-[20%] left-[30%]
                animate-pulse blur-sm" />

<div className="absolute w-2 h-2 bg-purple-400/40 rounded-full
                top-[60%] left-[70%]
                animate-pulse blur-sm delay-1000" />

      {/* Ambient Glow */}
      <div className="absolute top-[-300px] left-1/2 -translate-x-1/2
                      w-[900px] h-[900px]
                      bg-indigo-500/10 blur-[140px]
                      rounded-full pointer-events-none" />

      {/* Sidebar */}
      <aside
       className={`min-h-screen flex-shrink-0
  ${collapsed ? "w-20" : "w-64"}
  bg-white/5 backdrop-blur-2xl
  border-r border-white/10
  transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-6">
          {!collapsed && (
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              EvolveWeb AI
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-3">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white/10 border border-white/10"
                    : "hover:bg-white/10"
                }`
              }
            >
              <item.icon size={18} />
              {!collapsed && (
                <span className="text-sm">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4 text-xs text-gray-400">
          {!collapsed && "© 2026 EvolveWeb AI"}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* Topbar */}
        <header className="h-16 px-8 flex items-center justify-between
                           bg-white/5 backdrop-blur-xl border-b border-white/10">

          <h2 className="text-lg font-medium text-gray-200">
            Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
          </div>
        </header>

       <main className="flex-1 p-10 overflow-y-auto relative z-10">

  <div className="max-w-7xl mx-auto">
    <Outlet />
  </div>

</main>

      </div>
    </div>
  );
};

export default DashboardLayout;