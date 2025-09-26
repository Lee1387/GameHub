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
      <div className="card animate-slideUp max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 animate-glow">
            <SettingsIcon className="text-white mx-auto" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Account <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account preferences
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6">
              Profile Information
            </h2>

            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white text-2xl font-bold">
                  {getInitials(user?.username)}
                </span>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                    {user?.username}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6">
              Security
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Password
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Change your account password securely
                  </p>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="btn-secondary"
                >
                  Change Password
                </button>
              </div>
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
