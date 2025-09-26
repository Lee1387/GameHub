import { Link } from "react-router-dom";
import { User, Trophy, Gamepad } from "lucide-react";

function Navigation({ mobile = false, onItemClick }) {
  const baseClasses = mobile
    ? "flex flex-col space-y-4"
    : "flex items-center space-x-8 animate-slideDown";

  const linkClasses = mobile
    ? "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-200 flex items-center gap-2 py-2"
    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-200 flex items-center gap-2 hover:scale-105 transform";

  const buttonClasses = mobile
    ? "btn-primary flex items-center gap-2 justify-center w-full"
    : "btn-primary flex items-center gap-2";

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
      <Link to="/login" className={buttonClasses} onClick={onItemClick}>
        <User size={18} />
        Login
      </Link>
    </div>
  );
}

export default Navigation;
