import { memo } from "react";

const LoadingSpinner = memo(({ size = "md", color = "primary" }) => {
  const sizeMap = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  const colorMap = {
    primary: "border-blue-600 dark:border-blue-400",
    white: "border-white",
    gray: "border-gray-600 dark:border-gray-400",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeMap[size]} ${colorMap[color]}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
