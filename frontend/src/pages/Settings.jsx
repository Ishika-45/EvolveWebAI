import { useState, useEffect } from "react";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <SettingsIcon size={20} /> Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-xl p-6 rounded-2xl
                      bg-white/5 backdrop-blur-xl
                      border border-white/10">

        <h3 className="text-lg font-medium mb-4">
          Profile Information
        </h3>

        <div className="space-y-4">

          <div>
            <label className="text-xs text-gray-400">
              Name
            </label>
            <input
              value={user?.name || ""}
              disabled
              className="w-full mt-1 px-4 py-2 rounded-lg
                         bg-black/40 border border-white/10"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">
              Email
            </label>
            <input
              value={user?.email || ""}
              disabled
              className="w-full mt-1 px-4 py-2 rounded-lg
                         bg-black/40 border border-white/10"
            />
          </div>

        </div>

      </div>

      {/* Danger Zone */}
      <div className="max-w-xl mt-8 p-6 rounded-2xl
                      bg-red-500/5 border border-red-500/20">

        <h3 className="text-lg font-medium text-red-400 mb-2">
          Danger Zone
        </h3>

        <p className="text-sm text-gray-400 mb-4">
          Logout from your account.
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}

          className="px-4 py-2 rounded-lg
                     bg-red-500/20 hover:bg-red-500/30
                     text-red-400 text-sm transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Settings;