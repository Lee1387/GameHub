import { verifyToken } from "../utils/jwt.js";
import { error } from "../utils/response.js";
import User from "../models/User.js";
import { HTTP_STATUS, MESSAGES } from "../config/constants.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return error(
        res,
        MESSAGES.ACCESS_TOKEN_REQUIRED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) {
      return error(res, MESSAGES.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (err) {
    return error(res, MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }
};
