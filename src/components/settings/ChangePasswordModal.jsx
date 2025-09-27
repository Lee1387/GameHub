import { useState } from "react";
import { X, Lock, Check, Shield } from "lucide-react";
import { LoadingSpinner, FormField, PasswordStrength } from "../ui";
import { authAPI } from "../../utils/api";
import { useBodyScrollLock } from "../../utils/helpers";

function ChangePasswordModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useBodyScrollLock(isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authAPI.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    setIsSuccess(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full mx-4 animate-fadeInScale max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">
              Change Password
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="text-gray-500 dark:text-gray-400" size={20} />
            </button>
          </div>

          {isSuccess ? (
            <div className="text-center py-6 md:py-8">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 md:p-4 rounded-2xl w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center">
                <Check
                  className="text-green-600 dark:text-green-400"
                  size={28}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
                Password Changed Successfully
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6 px-2">
                Your password has been updated successfully. Make sure to
                remember your new password.
              </p>
              <button onClick={handleClose} className="btn-primary w-full">
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-4 md:mb-6">
                <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-3 rounded-2xl w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 animate-glow flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 px-2">
                  Enter your current password and choose a new secure password.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-3 md:px-4 py-2 md:py-3 rounded-lg mb-4 md:mb-6 text-sm md:text-base">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <FormField
                  label="Current Password"
                  icon={Lock}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Current password"
                  required
                  showToggle
                  showValue={showCurrentPassword}
                  onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
                />

                <div>
                  <FormField
                    label="New Password"
                    icon={Lock}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New password"
                    required
                    showToggle
                    showValue={showNewPassword}
                    onToggle={() => setShowNewPassword(!showNewPassword)}
                  />
                  <PasswordStrength
                    password={formData.newPassword}
                    className="mt-2 md:mt-3"
                  />
                </div>

                <FormField
                  label="Confirm New Password"
                  icon={Lock}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  showToggle
                  showValue={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-secondary flex-1 order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 order-1 sm:order-2"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" color="white" />
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ChangePasswordModal;
