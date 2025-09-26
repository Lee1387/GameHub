import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="text-gray-700 dark:text-gray-300" size={20} />
      ) : (
        <Sun className="text-gray-700 dark:text-gray-300" size={20} />
      )}
    </button>
  );
}

export default ThemeToggle;
