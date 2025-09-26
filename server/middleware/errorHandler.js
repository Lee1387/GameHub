import { error } from "../utils/response.js";
import { HTTP_STATUS, MESSAGES } from "../config/constants.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    return error(
      res,
      MESSAGES.VALIDATION_ERROR,
      HTTP_STATUS.BAD_REQUEST,
      errors
    );
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return error(res, `${field} already exists`, HTTP_STATUS.BAD_REQUEST);
  }

  if (err.name === "JsonWebTokenError") {
    return error(res, MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === "TokenExpiredError") {
    return error(res, MESSAGES.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED);
  }

  return error(res, MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
};

export const notFound = (req, res) => {
  error(
    res,
    `${MESSAGES.ROUTE_NOT_FOUND}: ${req.originalUrl}`,
    HTTP_STATUS.NOT_FOUND
  );
};
