import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Bell,
  Moon,
  Sun,
  Globe,
  Key,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Save
} from "lucide-react";
import toast from "react-hot-toast";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [apiKey] = useState("ewb_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 8));
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopiedApiKey(true);
      toast.success("API key copied to clipboard!");
      setTimeout(() => setCopiedApiKey(false), 2000);
    } catch (error) {
      toast.error("Failed to copy API key");
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Settings saved successfully!");
    setIsSaving(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell }
  ];

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 mb-3">
          <SettingsIcon className="w-3 h-3 text-[var(--theme-accent)]" />
          <span className="text-xs text-[var(--theme-accent)]">Account Settings</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-[var(--theme-textSecondary)] text-sm mt-1">
          Manage your account preferences and security settings
        </p>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${activeTab === tab.id 
                    ? "bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <tab.icon size={18} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Profile Card */}
                <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`
                      }}>
                      <span className="text-3xl font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
                      <p className="text-sm text-[var(--theme-textSecondary)]">Member since {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[var(--theme-textSecondary)] flex items-center gap-2 mb-2">
                        <User size={12} />
                        Full Name
                      </label>
                      <input
                        value={user?.name || ""}
                        disabled
                        className="w-full px-4 py-2 rounded-xl bg-black/40 border border-[var(--theme-borderColor)] text-gray-300"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--theme-textSecondary)] flex items-center gap-2 mb-2">
                        <Mail size={12} />
                        Email Address
                      </label>
                      <input
                        value={user?.email || ""}
                        disabled
                        className="w-full px-4 py-2 rounded-xl bg-black/40 border border-[var(--theme-borderColor)] text-gray-300"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--theme-textSecondary)] flex items-center gap-2 mb-2">
                        <Calendar size={12} />
                        Account Created
                      </label>
                      <input
                        value={new Date().toLocaleDateString()}
                        disabled
                        className="w-full px-4 py-2 rounded-xl bg-black/40 border border-[var(--theme-borderColor)] text-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                  
                  <div className="flex items-center justify-between py-3 border-b border-[var(--theme-borderColor)]">
                    <div>
                      <p className="text-sm text-white">Dark Mode</p>
                      <p className="text-xs text-[var(--theme-textSecondary)]">Toggle between light and dark theme</p>
                    </div>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        isDarkMode ? "bg-[var(--theme-accent)]" : "bg-gray-600"
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        isDarkMode ? "right-1" : "left-1"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm text-white">Language</p>
                      <p className="text-xs text-[var(--theme-textSecondary)]">Choose your preferred language</p>
                    </div>
                    <select className="px-3 py-1.5 rounded-lg bg-white/5 border border-[var(--theme-borderColor)] text-white text-sm">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Editor Preferences</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 text-[var(--theme-accent)]" />
                      <span className="text-sm text-gray-300">Auto-save projects</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 text-[var(--theme-accent)]" />
                      <span className="text-sm text-gray-300">Show AI suggestions</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/20 text-[var(--theme-accent)]" />
                      <span className="text-sm text-gray-300">Live preview on hover</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">API Access</h3>
                  
                  <div className="mb-4">
                    <label className="text-xs text-[var(--theme-textSecondary)] mb-2 block">API Key</label>
                    <div className="relative">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        readOnly
                        className="w-full px-4 py-2 pr-24 rounded-xl bg-black/40 border border-[var(--theme-borderColor)] text-gray-300 font-mono text-sm"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                        <button
                          onClick={copyApiKey}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition"
                          title="Copy API key"
                        >
                          {copiedApiKey ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition"
                          title={showApiKey ? "Hide" : "Show"}
                        >
                          {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--theme-textSecondary)] mt-2">Keep your API key secure. Do not share it publicly.</p>
                  </div>

                  <button className="px-4 py-2 rounded-lg bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-sm hover:bg-[var(--theme-accent)]/30 transition">
                    Regenerate API Key
                  </button>
                </div>

                <div className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition">
                    Change Password
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
                  </div>
                  <p className="text-sm text-[var(--theme-textSecondary)] mb-4">
                    Once you delete your account, there is no going back. This action is irreversible.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                      className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition"
                    >
                      Logout
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[var(--theme-cardBg)] backdrop-blur-xl border border-[var(--theme-borderColor)] rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-[var(--theme-borderColor)]">
                    <div>
                      <p className="text-sm text-white">Email Notifications</p>
                      <p className="text-xs text-[var(--theme-textSecondary)]">Receive updates about your projects</p>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        emailNotifications ? "bg-[var(--theme-accent)]" : "bg-gray-600"
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        emailNotifications ? "right-1" : "left-1"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[var(--theme-borderColor)]">
                    <div>
                      <p className="text-sm text-white">Push Notifications</p>
                      <p className="text-xs text-[var(--theme-textSecondary)]">Browser notifications for AI generation</p>
                    </div>
                    <button
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        pushNotifications ? "bg-[var(--theme-accent)]" : "bg-gray-600"
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                        pushNotifications ? "right-1" : "left-1"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm text-white">AI Completion Alerts</p>
                      <p className="text-xs text-[var(--theme-textSecondary)]">Get notified when AI finishes generating</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-[var(--theme-accent)]">
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--theme-borderColor)]">
                  <button
                    onClick={saveSettings}
                    disabled={isSaving}
                    className="px-6 py-2 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, var(--theme-gradient-start), var(--theme-gradient-end))`,
                      boxShadow: `0 0 20px var(--theme-glow)`
                    }}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;