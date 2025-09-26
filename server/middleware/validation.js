import { error } from "../utils/response.js";
import { AUTH_CONSTANTS, HTTP_STATUS, MESSAGES } from "../config/constants.js";
import User from "../models/User.js";
import crypto from "crypto";

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
      MESSAGES.USERNAME_LENGTH_INVALID,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!emailRegex.test(email)) {
    return error(res, MESSAGES.EMAIL_INVALID, HTTP_STATUS.BAD_REQUEST);
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
    return error(res, MESSAGES.EMAIL_INVALID, HTTP_STATUS.BAD_REQUEST);
  }

  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return error(res, MESSAGES.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!emailRegex.test(email)) {
    return error(res, MESSAGES.EMAIL_INVALID, HTTP_STATUS.BAD_REQUEST);
  }

  next();
};

export const validateResetPassword = async (req, res, next) => {
  const { password, token } = req.body;

  if (!token) {
    return error(res, MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!password) {
    return error(res, MESSAGES.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
    return error(res, MESSAGES.PASSWORD_MIN_LENGTH, HTTP_STATUS.BAD_REQUEST);
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return error(
        res,
        MESSAGES.TOKEN_INVALID_EXPIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const isReused = await user.isPasswordReused(password);
    if (isReused) {
      return error(res, MESSAGES.PASSWORD_REUSED, HTTP_STATUS.BAD_REQUEST);
    }

    next();
  } catch (err) {
    return error(
      res,
      MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
