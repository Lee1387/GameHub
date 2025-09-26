import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    setIsOpen(false);
  };

  const handleSettings = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) ||
      user?.username?.[0]?.toUpperCase() ||
      "U"
    );
  };

  const truncateEmail = (email, maxLength = 20) => {
    if (!email || email.length <= maxLength) return email;
    const [localPart, domain] = email.split("@");
    if (localPart.length > maxLength - 8) {
      return `${localPart.slice(0, maxLength - 8)}...@${domain}`;
    }
    return email;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group min-w-0"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
          <span className="text-white text-sm font-semibold">
            {getInitials(user?.username)}
          </span>
        </div>
        <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate max-w-24 sm:max-w-32">
          {user?.username}
        </span>
        <ChevronDown
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 animate-slideDown backdrop-blur-sm">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white text-lg font-bold">
                    {getInitials(user?.username)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {user?.username}
                  </p>
                  <p
                    className="text-sm text-gray-500 dark:text-gray-400 truncate"
                    title={user?.email}
                  >
                    {truncateEmail(user?.email)}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <button
                onClick={handleSettings}
                className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-3 transition-all duration-200 font-medium"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings
                    size={16}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-all duration-200 font-medium"
              >
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LogOut
                    size={16}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileDropdown;
