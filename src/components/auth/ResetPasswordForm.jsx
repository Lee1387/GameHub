import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Shield, ArrowRight } from "lucide-react";
import { LoadingSpinner, FormField, PasswordStrength } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../utils/api";

function ResetPasswordForm({ token }) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.resetPassword({
        token,
        password: formData.password,
      });
      login(response.data.user, response.data.token);
      navigate("/");
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

  return (
    <div className="card animate-slideUp max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 animate-glow">
          <Shield className="text-white mx-auto" size={32} />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
          Reset Your Password
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Enter your new password below
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="animate-slideUp stagger-1">
          <FormField
            label="New Password"
            icon={Lock}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your new password"
            required
            showToggle
            showValue={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <PasswordStrength password={formData.password} className="mt-3" />
        </div>

        <FormField
          label="Confirm New Password"
          icon={Lock}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your new password"
          required
          showToggle
          showValue={showConfirmPassword}
          onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          className="animate-slideUp stagger-2"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 animate-slideUp stagger-3"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="white" />
          ) : (
            <>
              Reset Password
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
