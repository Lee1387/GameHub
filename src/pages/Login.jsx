import AnimatedBackground from "../components/ui/AnimatedBackground";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center py-12 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md px-6">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
