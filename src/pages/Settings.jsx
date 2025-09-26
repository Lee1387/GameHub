import { AnimatedBackground } from "../components/ui";
import { SettingsForm } from "../components/settings";

function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-slate-800 py-12 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <SettingsForm />
      </div>
    </div>
  );
}

export default Settings;
