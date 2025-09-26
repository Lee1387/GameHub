import jwt from "jsonwebtoken";
import { AUTH_CONSTANTS } from "../config/constants.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: AUTH_CONSTANTS.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
