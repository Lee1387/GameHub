function LoadingSpinner({ size = "md", color = "primary" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    primary: "border-blue-600 dark:border-blue-400",
    white: "border-white",
    gray: "border-gray-600 dark:border-gray-400",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${colorClasses[color]}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
