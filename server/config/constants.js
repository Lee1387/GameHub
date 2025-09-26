export const AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  JWT_EXPIRES_IN: "7d",
  RESET_TOKEN_EXPIRES_IN: 60 * 60 * 1000,
  BCRYPT_SALT_ROUNDS: 12,
  PASSWORD_HISTORY_LIMIT: 3,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  SUCCESS: "Success",
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "User registered successfully",
  PASSWORD_RESET_SENT: "Password reset link sent to email",
  PASSWORD_RESET_SUCCESS: "Password reset successful",
  PASSWORD_CHANGE_SUCCESS: "Password changed successfully",
  TOKEN_VALID: "Token is valid",
  ALL_FIELDS_REQUIRED: "All fields are required",
  EMAIL_PASSWORD_REQUIRED: "Email and password are required",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "New password is required",
  PASSWORD_CHANGE_REQUIRED: "Current password and new password are required",
  PASSWORD_MIN_LENGTH: `Password must be at least ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} characters`,
  PASSWORD_REUSED:
    "Cannot reuse your current password or any of your last 3 passwords",
  CURRENT_PASSWORD_INCORRECT: "Current password is incorrect",
  USERNAME_LENGTH_INVALID: `Username must be between ${AUTH_CONSTANTS.MIN_USERNAME_LENGTH} and ${AUTH_CONSTANTS.MAX_USERNAME_LENGTH} characters`,
  EMAIL_INVALID: "Please provide a valid email address",
  USER_EXISTS: "User already exists",
  INVALID_CREDENTIALS: "Invalid credentials",
  TOKEN_REQUIRED: "Token is required",
  TOKEN_INVALID_EXPIRED: "Token is invalid or has expired",
  ACCESS_TOKEN_REQUIRED: "Access token required",
  INVALID_TOKEN: "Invalid token",
  TOKEN_EXPIRED: "Token expired",
  USER_NOT_FOUND: "Invalid token or user not found",
  INTERNAL_ERROR: "Internal server error",
  VALIDATION_ERROR: "Validation Error",
  RATE_LIMIT_EXCEEDED: "Too many requests, please try again later",
  INVALID_INPUT: "Invalid input data",
  ROUTE_NOT_FOUND: "Route not found",
};

export const RATE_LIMITS = {
  AUTH: {
    windowMs: 15 * 60 * 1000,
    max: 15,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },

  GENERAL: {
    windowMs: 15 * 60 * 1000,
    max: 200,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },

  USER_AUTHENTICATED: {
    windowMs: 15 * 60 * 1000,
    max: 500,
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },

  STRICT: {
    windowMs: 60 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },
};
