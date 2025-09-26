import { classNames } from "../../utils/common";

function LoadingSpinner({ size = "md", color = "primary" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colors = {
    primary: "text-primary-600",
    white: "text-white",
    gray: "text-gray-600",
  };

  return (
    <div
      className={classNames(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizes[size],
        colors[color]
      )}
    />
  );
}

export default LoadingSpinner;
