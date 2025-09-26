import { HTTP_STATUS, MESSAGES } from "../config/constants.js";

export const success = (
  res,
  data,
  message = MESSAGES.SUCCESS,
  statusCode = HTTP_STATUS.OK
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const error = (
  res,
  message = "Something went wrong",
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
