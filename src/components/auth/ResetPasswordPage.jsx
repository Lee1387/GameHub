import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "../ui";
import { ResetPasswordForm } from "./";
import { authAPI } from "../../utils/api";

function ResetPasswordPage() {
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
        await authAPI.validateResetToken(token);
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
      <div className="card text-center max-w-md mx-auto animate-slideUp">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Validating reset link...
        </p>
      </div>
    );
  }

  if (!token || !isValidToken) {
    return (
      <div className="card text-center max-w-md mx-auto animate-slideUp">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Invalid Reset Link
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {error || "This password reset link is invalid or has expired."}
        </p>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default ResetPasswordPage;
