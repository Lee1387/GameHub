import express from "express";
import crypto from "crypto";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { success, error } from "../utils/response.js";
import { sendPasswordResetEmail } from "../utils/email.js";
import { authenticate } from "../middleware/auth.js";
import {
  authRateLimit,
  validateInput,
  strictRateLimit,
  userRateLimit,
} from "../middleware/security.js";
import {
  validateRegister,
  validateLogin,
  validateEmail,
  validateResetPassword,
} from "../middleware/validation.js";
import { HTTP_STATUS, MESSAGES, AUTH_CONSTANTS } from "../config/constants.js";

const router = express.Router();

router.use(authRateLimit);
router.use(validateInput);

router.post("/register", validateRegister, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return error(res, MESSAGES.USER_EXISTS, HTTP_STATUS.BAD_REQUEST);
    }

    const user = await User.create({ username, email, password });
    const token = generateToken({ id: user._id });

    success(
      res,
      { user, token },
      MESSAGES.REGISTER_SUCCESS,
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    next(err);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return error(res, MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return error(res, MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    const token = generateToken({ id: user._id });
    success(res, { user, token }, MESSAGES.LOGIN_SUCCESS);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/forgot-password",
  strictRateLimit,
  validateEmail,
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email, isActive: true });
      if (!user) {
        return success(res, null, MESSAGES.PASSWORD_RESET_SENT);
      }

      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });
      await sendPasswordResetEmail(email, resetToken);

      success(res, null, MESSAGES.PASSWORD_RESET_SENT);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/validate-reset-token/:token", async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return error(res, MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.BAD_REQUEST);
    }

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

    success(res, null, MESSAGES.TOKEN_VALID);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/reset-password",
  strictRateLimit,
  validateResetPassword,
  async (req, res, next) => {
    try {
      const { token, password } = req.body;

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
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

      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      const authToken = generateToken({ id: user._id });
      success(res, { user, token: authToken }, MESSAGES.PASSWORD_RESET_SUCCESS);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/change-password",
  authenticate,
  userRateLimit,
  async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return error(
          res,
          MESSAGES.PASSWORD_CHANGE_REQUIRED,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      if (newPassword.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
        return error(
          res,
          MESSAGES.PASSWORD_MIN_LENGTH,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return error(res, MESSAGES.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED);
      }

      const isValidCurrentPassword = await user.comparePassword(
        currentPassword
      );
      if (!isValidCurrentPassword) {
        return error(
          res,
          MESSAGES.CURRENT_PASSWORD_INCORRECT,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const isReused = await user.isPasswordReused(newPassword);
      if (isReused) {
        return error(res, MESSAGES.PASSWORD_REUSED, HTTP_STATUS.BAD_REQUEST);
      }

      user.password = newPassword;
      await user.save();

      success(res, null, MESSAGES.PASSWORD_CHANGE_SUCCESS);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
