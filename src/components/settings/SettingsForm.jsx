import { useState, memo } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { ChangePasswordModal } from "./";
import { useAuth } from "../../context/AuthContext";

const SettingsForm = memo(() => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { user } = useAuth();

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) ||
      user?.username?.[0]?.toUpperCase() ||
      "U"
    );
  };

  return (
    <>
      <div className="card animate-slideUp w-full max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-3 md:p-4 rounded-2xl w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 animate-glow flex items-center justify-center">
            <SettingsIcon className="text-white" size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Account <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 px-4">
            Manage your account preferences
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-display font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
              Profile Information
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mx-auto sm:mx-0">
                <span className="text-white text-lg sm:text-2xl font-bold">
                  {getInitials(user?.username)}
                </span>
              </div>

              <div className="flex-1 w-full space-y-3 md:space-y-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="px-3 md:px-4 py-2 md:py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm md:text-base break-all">
                    {user?.username}
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="px-3 md:px-4 py-2 md:py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm md:text-base break-all">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-display font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
              Security
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                    Password
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Change your account password securely
                  </p>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg md:rounded-xl font-semibold transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm md:text-base"
                >
                  Change Password
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Account Created
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Account Status
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-display font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <button className="flex items-center gap-3 p-3 md:p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <SettingsIcon
                    size={16}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                    Preferences
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    Game settings & preferences
                  </div>
                </div>
              </button>

              <button className="flex items-center gap-3 p-3 md:p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <SettingsIcon
                    size={16}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                    Privacy
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    Manage your privacy settings
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
});

SettingsForm.displayName = "SettingsForm";

export default SettingsForm;
