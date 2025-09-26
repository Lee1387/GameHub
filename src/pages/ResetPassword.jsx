import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { auth } from "../utils/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        return;
      }

      try {
        await auth.validateResetToken(token);
        setIsValidToken(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center py-12 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="card text-center">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Validating reset link...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!token || !isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center py-12 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="card text-center">
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Invalid Reset Link
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {error || "This password reset link is invalid or has expired."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center py-12 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md px-6">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}

export default ResetPassword;
