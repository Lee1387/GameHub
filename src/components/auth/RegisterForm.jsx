import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";
import { LoadingSpinner, FormField } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../utils/api";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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

    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms and Privacy Policy to continue");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { confirmPassword, agreeToTerms, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      login(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="card animate-slideUp max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 animate-glow">
          <UserPlus className="text-white mx-auto" size={32} />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
          Join <span className="text-gradient">GameHub</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Create your account and start competing
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Username"
          icon={User}
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          required
          className="animate-slideUp stagger-1"
        />

        <FormField
          label="Email Address"
          icon={Mail}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="animate-slideUp stagger-2"
        />

        <FormField
          label="Password"
          icon={Lock}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
          showToggle
          showValue={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
          className="animate-slideUp stagger-3"
        />

        <FormField
          label="Confirm Password"
          icon={Lock}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          showToggle
          showValue={showConfirmPassword}
          onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          className="animate-slideUp stagger-4"
        />

        <div className="animate-slideUp stagger-5">
          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-2 transition-all duration-200 mt-1"
              required
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline font-medium"
              >
                Privacy Policy
              </a>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 animate-slideUp stagger-6"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="white" />
          ) : (
            <>
              Create Account
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center animate-fadeIn">
        <p className="text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
