import { error } from "../utils/response.js";
import { AUTH_CONSTANTS, HTTP_STATUS, MESSAGES } from "../config/constants.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return error(res, MESSAGES.ALL_FIELDS_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
    return error(res, MESSAGES.PASSWORD_MIN_LENGTH, HTTP_STATUS.BAD_REQUEST);
  }

  if (
    username.length < AUTH_CONSTANTS.MIN_USERNAME_LENGTH ||
    username.length > AUTH_CONSTANTS.MAX_USERNAME_LENGTH
  ) {
    return error(
      res,
      `Username must be between ${AUTH_CONSTANTS.MIN_USERNAME_LENGTH} and ${AUTH_CONSTANTS.MAX_USERNAME_LENGTH} characters`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!emailRegex.test(email)) {
    return error(
      res,
      "Please provide a valid email address",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return error(
      res,
      MESSAGES.EMAIL_PASSWORD_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!emailRegex.test(email)) {
    return error(
      res,
      "Please provide a valid email address",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return error(res, MESSAGES.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!emailRegex.test(email)) {
    return error(
      res,
      "Please provide a valid email address",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  next();
};

export const validateResetPassword = (req, res, next) => {
  const { password, token } = req.body;

  if (!token) {
    return error(res, MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!password) {
    return error(res, "New password is required", HTTP_STATUS.BAD_REQUEST);
  }

  if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
    return error(res, MESSAGES.PASSWORD_MIN_LENGTH, HTTP_STATUS.BAD_REQUEST);
  }

  next();
};
