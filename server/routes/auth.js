import express from "express";
import crypto from "crypto";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { success, error } from "../utils/response.js";
import { sendPasswordResetEmail } from "../utils/email.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return error(res, "All fields are required", 400);
    }

    if (password.length < 6) {
      return error(res, "Password must be at least 6 characters", 400);
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return error(res, "User already exists", 400);
    }

    const user = await User.create({ username, email, password });
    const token = generateToken({ id: user._id });

    success(res, { user, token }, "User registered successfully", 201);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, "Email and password are required", 400);
    }

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return error(res, "Invalid credentials", 401);
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return error(res, "Invalid credentials", 401);
    }

    const token = generateToken({ id: user._id });

    success(res, { user, token }, "Login successful");
  } catch (err) {
    next(err);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return error(res, "Email is required", 400);
    }

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return success(res, null, "If email exists, reset link has been sent");
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    await sendPasswordResetEmail(email, resetToken);

    success(res, null, "Password reset link sent to email");
  } catch (err) {
    next(err);
  }
});

router.get("/validate-reset-token/:token", async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return error(res, "Token is required", 400);
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return error(res, "Token is invalid or has expired", 400);
    }

    success(res, { valid: true }, "Token is valid");
  } catch (err) {
    next(err);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return error(res, "Token and password are required", 400);
    }

    if (password.length < 6) {
      return error(res, "Password must be at least 6 characters", 400);
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return error(res, "Token is invalid or has expired", 400);
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const authToken = generateToken({ id: user._id });

    success(res, { user, token: authToken }, "Password reset successful");
  } catch (err) {
    next(err);
  }
});

router.get("/me", authenticate, async (req, res) => {
  success(res, { user: req.user }, "User data retrieved");
});

router.put("/me", authenticate, async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username) {
      return error(res, "Username is required", 400);
    }

    const existingUser = await User.findOne({
      username,
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      return error(res, "Username already taken", 400);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username },
      { new: true, runValidators: true }
    );

    success(res, { user }, "Profile updated successfully");
  } catch (err) {
    next(err);
  }
});

export default router;
