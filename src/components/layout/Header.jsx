import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Navigation from "./Navigation";
import ThemeToggle from "../ui/ThemeToggle";
import { debounce } from "../../utils/performance";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const debouncedToggle = useCallback(
    debounce(() => {
      setMobileMenuOpen((prev) => !prev);
    }, 150),
    []
  );

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center animate-slideDown">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Navigation />
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={debouncedToggle}
            >
              {mobileMenuOpen ? (
                <X className="text-gray-700 dark:text-gray-300" size={24} />
              ) : (
                <Menu className="text-gray-700 dark:text-gray-300" size={24} />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 animate-slideDown">
            <Navigation mobile onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
