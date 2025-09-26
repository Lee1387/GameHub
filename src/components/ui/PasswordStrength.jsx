import { memo } from "react";
import { calculatePasswordStrength } from "../../utils/helpers";

const PasswordStrength = memo(({ password, className = "" }) => {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const colorClasses = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-300",
  };

  const textColorClasses = {
    red: "text-red-600 dark:text-red-400",
    orange: "text-orange-600 dark:text-orange-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    gray: "text-gray-600 dark:text-gray-400",
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password Strength
        </span>
        <span
          className={`text-sm font-medium ${textColorClasses[strength.color]}`}
        >
          {strength.label}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            colorClasses[strength.color]
          }`}
          style={{ width: `${strength.percentage}%` }}
        />
      </div>

      {strength.feedback.length > 0 && (
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          {strength.feedback.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

PasswordStrength.displayName = "PasswordStrength";

export default PasswordStrength;
