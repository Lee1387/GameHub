import { forwardRef } from "react";

const FormField = forwardRef(
  (
    {
      label,
      icon: Icon,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      required = false,
      error,
      showToggle = false,
      onToggle,
      showValue = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          )}
          <input
            ref={ref}
            type={showToggle ? (showValue ? "text" : "password") : type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full pl-12 pr-12 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
            placeholder={placeholder}
            required={required}
            {...props}
          />
          {showToggle && onToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showValue ? "Hide" : "Show"}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
