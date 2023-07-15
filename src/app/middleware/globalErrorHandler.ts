import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interface/IGenericErrorMessage";
import ApiError from "../../errors/ApiError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.message
      ? [
          {
            path: "",
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = err.message
      ? [
          {
            path: "",
            message: err.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: err?.stack,
  });
};
