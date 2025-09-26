import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { RATE_LIMITS, HTTP_STATUS, MESSAGES } from "../config/constants.js";
import { error } from "../utils/response.js";

export const securityHeaders = helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});

export const authRateLimit = rateLimit({
  ...RATE_LIMITS.AUTH,
  message: { success: false, message: MESSAGES.RATE_LIMIT_EXCEEDED },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiRateLimit = rateLimit({
  ...RATE_LIMITS.GENERAL,
  message: { success: false, message: MESSAGES.RATE_LIMIT_EXCEEDED },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.path === "/health" || req.path === "/api/health";
  },
});

export const userRateLimit = rateLimit({
  ...RATE_LIMITS.USER_AUTHENTICATED,
  keyGenerator: (req, res) => {
    if (req.user?.id) {
      return `user:${req.user.id}`;
    }
    return undefined;
  },
  message: { success: false, message: MESSAGES.RATE_LIMIT_EXCEEDED },
  standardHeaders: true,
  legacyHeaders: false,
});

export const strictRateLimit = rateLimit({
  ...RATE_LIMITS.STRICT,
  message: { success: false, message: MESSAGES.RATE_LIMIT_EXCEEDED },
  standardHeaders: true,
  legacyHeaders: false,
});

export const validateInput = (req, res, next) => {
  const { body } = req;

  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string") {
      body[key] = value.trim();
      if (body[key].length > 1000) {
        return error(res, MESSAGES.INVALID_INPUT, HTTP_STATUS.BAD_REQUEST);
      }
    }
  }

  next();
};
