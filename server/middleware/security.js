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

export const generalRateLimit = rateLimit({
  ...RATE_LIMITS.GENERAL,
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
