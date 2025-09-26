import { error } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    return error(res, "Validation Error", 400, errors);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return error(res, `${field} already exists`, 400);
  }

  if (err.name === "JsonWebTokenError") {
    return error(res, "Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    return error(res, "Token expired", 401);
  }

  return error(res, "Internal server error", 500);
};

export const notFound = (req, res) => {
  error(res, `Route ${req.originalUrl} not found`, 404);
};
