import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Folder,
  Sparkles,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  LogOut,
  User,
  ChevronRight,
  Zap,
  Menu
} from "lucide-react";
import CursorGlow from "../components/CursorGlow";
import ThemeSwitcher from "../components/ThemeSwitcher";
import LogoIcon from "../components/LogoIcon";
import Logo from "../components/Logo";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "✨ Your project 'AI Startup' was generated successfully", time: "2 min ago", read: false },
    { id: 2, message: "🎨 New premium templates available", time: "1 hour ago", read: false },
    { id: 3, message: "🚀 AI generation speed increased by 40%", time: "3 hours ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Overview";
    if (path.includes("/projects")) return "Projects";
    if (path.includes("/templates")) return "Templates";
    if (path.includes("/settings")) return "Settings";
    if (path.includes("/project")) return "Project Editor";
    return "Dashboard";
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", description: "Overview & stats" },
    { name: "Projects", icon: Folder, path: "/dashboard/projects", description: "Manage your projects" },
    { name: "Templates", icon: Sparkles, path: "/dashboard/templates", description: "Browse templates" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings", description: "Account settings" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    // MAIN CONTAINER - Uses theme background
    <div className="min-h-screen flex text-white relative overflow-hidden" style={{ backgroundColor: 'var(--theme-bgPrimary)' }}>
      
      <CursorGlow />
      
      {/* Animated Background Grid - Optional decorative element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/10"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(showMobileSidebar || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, type: "spring" }}
            className={`fixed lg:relative z-40 min-h-screen flex-shrink-0
              ${collapsed ? "w-20" : "w-64"}
              bg-[var(--theme-cardBg)] backdrop-blur-2xl
              border-r border-[var(--theme-borderColor)]
              transition-all duration-300 flex flex-col`}
          >
            {/* Logo Section */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--theme-borderColor)]">
              {!collapsed && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-2"
  >
    <Logo/>
  </motion.div>
)}
{collapsed && (
  <div className="w-8 h-8 mx-auto">
    <LogoIcon />
  </div>
)}
              
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6">
              {navItems.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 mx-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? "bg-[var(--theme-accent)]/20 border border-[var(--theme-accent)]/30" 
                      : "hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon 
                        size={20} 
                        className={`transition-all duration-300 ${
                          isActive ? "text-[var(--theme-accent)]" : "text-gray-500 group-hover:text-[var(--theme-accent)]"
                        }`}
                      />
                      
                      {!collapsed && (
                        <div className="flex-1">
                          <span className={`text-sm ${isActive ? "text-white font-medium" : "text-gray-400"}`}>
                            {item.name}
                          </span>
                          <p className="text-[10px] text-gray-500">{item.description}</p>
                        </div>
                      )}
                      
                      {!collapsed && isActive && (
                        <ChevronRight size={14} className="text-[var(--theme-accent)]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-[var(--theme-borderColor)]">
              <div className="relative group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)] flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                  </div>
                  
                  {!collapsed && (
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</p>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-3 border-b border-[var(--theme-borderColor)]">
                    <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-400">{user?.email || "user@example.com"}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-sm text-gray-300 hover:text-white transition-colors">
                      <User size={14} />
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {!collapsed && (
              <div className="p-4 text-center">
                <p className="text-[10px] text-gray-600">© 2026 EvolveWeb AI</p>
                <p className="text-[10px] text-gray-600 mt-1">v2.0.0</p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 min-h-screen">
        
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 px-6 flex items-center justify-between bg-[var(--theme-cardBg)] backdrop-blur-xl border-b border-[var(--theme-borderColor)]">
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <h2 className="text-lg font-semibold text-white">{getPageTitle()}</h2>
              <p className="text-xs text-gray-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden md:flex p-2 rounded-lg hover:bg-white/10 transition-all duration-300">🔍</button>
            <ThemeSwitcher />

            {/* Notifications */}
            <div className="relative group">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                <Bell size={18} />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-xl shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-[var(--theme-borderColor)]">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <p className="text-xs text-gray-500">You have {unreadCount} unread notifications</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 border-b border-[var(--theme-borderColor)]/50 hover:bg-white/5 transition-colors cursor-pointer ${!notif.read ? 'bg-[var(--theme-accent)]/5' : ''}`}>
                          <p className="text-sm text-gray-300">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button className="text-xs text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)]">Mark all as read</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[var(--theme-gradient-start)] to-[var(--theme-gradient-end)] flex items-center justify-center">
                <span className="text-xs font-bold">{user?.name?.charAt(0).toUpperCase() || "U"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;