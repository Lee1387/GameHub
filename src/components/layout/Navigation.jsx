import { Link } from "react-router-dom";
import { User, Trophy, Gamepad, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function Navigation({ mobile = false, onItemClick }) {
  const { isAuthenticated, user, logout } = useAuth();

  const baseClasses = mobile
    ? "flex flex-col space-y-4"
    : "flex items-center space-x-8 animate-slideDown";

  const linkClasses = mobile
    ? "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-200 flex items-center gap-2 py-2"
    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-200 flex items-center gap-2 hover:scale-105 transform";

  const buttonClasses = mobile
    ? "btn-primary flex items-center gap-2 justify-center w-full"
    : "btn-primary flex items-center gap-2";

  const handleLogout = () => {
    logout();
    if (onItemClick) onItemClick();
  };

  return (
    <div className={baseClasses}>
      <Link to="/games" className={linkClasses} onClick={onItemClick}>
        <Gamepad size={18} />
        Games
      </Link>
      <Link to="/leaderboard" className={linkClasses} onClick={onItemClick}>
        <Trophy size={18} />
        Leaderboard
      </Link>

      {isAuthenticated ? (
        <div
          className={
            mobile ? "flex flex-col space-y-4" : "flex items-center space-x-4"
          }
        >
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Welcome, {user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="btn-secondary flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className={buttonClasses} onClick={onItemClick}>
          <User size={18} />
          Login
        </Link>
      )}
    </div>
  );
}

export default Navigation;
