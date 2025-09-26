import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { success, error } from "../utils/response.js";
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
