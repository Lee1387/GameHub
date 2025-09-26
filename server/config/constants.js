export const AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  JWT_EXPIRES_IN: "7d",
  RESET_TOKEN_EXPIRES_IN: 60 * 60 * 1000,
  BCRYPT_SALT_ROUNDS: 12,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  SUCCESS: "Success",
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "User registered successfully",
  PASSWORD_RESET_SENT: "Password reset link sent to email",
  PASSWORD_RESET_SUCCESS: "Password reset successful",
  ALL_FIELDS_REQUIRED: "All fields are required",
  EMAIL_PASSWORD_REQUIRED: "Email and password are required",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_MIN_LENGTH: `Password must be at least ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} characters`,
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
};

export const RATE_LIMITS = {
  AUTH: { windowMs: 15 * 60 * 1000, max: 5 },
  GENERAL: { windowMs: 15 * 60 * 1000, max: 100 },
};
