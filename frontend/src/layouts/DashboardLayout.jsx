import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex 
                    bg-gradient-to-br 
                    from-[#0f172a] via-[#111827] to-[#1f2937] 
                    text-white">

      {/* SIDEBAR */}
      <aside
        className={`transition-all duration-300 
                    bg-white/5 backdrop-blur-xl 
                    border-r border-white/10 
                    flex flex-col
                    ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-6">

          {!collapsed && (
            <h1 className="text-xl font-bold 
                           bg-gradient-to-r from-purple-400 to-indigo-400 
                           bg-clip-text text-transparent">
              EvolveWeb AI
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 px-3">

          <SidebarItem collapsed={collapsed} label="Dashboard" />
          <SidebarItem collapsed={collapsed} label="My Projects" />
          <SidebarItem collapsed={collapsed} label="Templates" />
          <SidebarItem collapsed={collapsed} label="Settings" />

        </nav>

        <div className="mt-auto p-4 text-xs text-gray-400">
          {!collapsed && "© 2026 EvolveWeb AI"}
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 px-8 flex items-center justify-between 
                           bg-white/5 backdrop-blur-xl 
                           border-b border-white/10">

          <h2 className="text-lg font-semibold text-gray-200">
            Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Welcome back 👋
            </span>

            <div className="w-9 h-9 rounded-full 
                            bg-gradient-to-r 
                            from-purple-500 to-indigo-500">
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

const SidebarItem = ({ collapsed, label }) => {
  return (
    <button
      className="flex items-center gap-3 
                 px-3 py-2 rounded-lg 
                 hover:bg-white/10 transition"
    >
      <div className="w-6 h-6 rounded-md 
                      bg-gradient-to-r 
                      from-purple-500 to-indigo-500" />

      {!collapsed && (
        <span className="text-gray-300 text-sm">
          {label}
        </span>
      )}
    </button>
  );
};

export default DashboardLayout;