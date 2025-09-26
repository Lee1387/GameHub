import { useState } from "react";
import { X, Mail, Check } from "lucide-react";
import { LoadingSpinner, FormField } from "../ui";
import { authAPI } from "../../utils/api";
import { useBodyScrollLock } from "../../utils/helpers";

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useBodyScrollLock(isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authAPI.forgotPassword({ email });
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setIsSuccess(false);
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
        <div className="card max-w-md w-full animate-fadeInScale">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              Reset Password
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="text-gray-500 dark:text-gray-400" size={20} />
            </button>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl w-20 h-20 mx-auto mb-6">
                <Check
                  className="text-green-600 dark:text-green-400 mx-auto"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Check Your Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've sent password reset instructions to{" "}
                <strong>{email}</strong>
              </p>
              <button onClick={handleClose} className="btn-primary">
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" color="white" />
                    ) : (
                      "Send Reset Link"
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

export default ForgotPasswordModal;
