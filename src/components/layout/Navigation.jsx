import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { User, Trophy, Gamepad } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ProfileDropdown } from "../ui";

const Navigation = memo(({ mobile = false, onItemClick }) => {
  const { isAuthenticated } = useAuth();

  const classes = useMemo(
    () => ({
      base: mobile
        ? "flex flex-col space-y-4"
        : "flex items-center space-x-8 animate-slideDown",
      link: mobile
        ? "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-200 flex items-center gap-2 py-2"
        : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-200 flex items-center gap-2 hover:scale-105 transform",
      button: mobile
        ? "btn-primary flex items-center gap-2 justify-center w-full"
        : "btn-primary flex items-center gap-2",
    }),
    [mobile]
  );

  return (
    <div className={classes.base}>
      <Link to="/games" className={classes.link} onClick={onItemClick}>
        <Gamepad size={18} />
        Games
      </Link>
      <Link to="/leaderboard" className={classes.link} onClick={onItemClick}>
        <Trophy size={18} />
        Leaderboard
      </Link>

      {isAuthenticated ? (
        <div
          onClick={mobile ? (e) => e.stopPropagation() : undefined}
          className="relative"
        >
          <ProfileDropdown />
        </div>
      ) : (
        <Link to="/login" className={classes.button} onClick={onItemClick}>
          <User size={18} />
          Login
        </Link>
      )}
    </div>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
