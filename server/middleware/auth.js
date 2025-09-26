import { verifyToken } from "../utils/jwt.js";
import { error } from "../utils/response.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return error(res, "Access token required", 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) {
      return error(res, "Invalid token or user not found", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    return error(res, "Invalid token", 401);
  }
};
