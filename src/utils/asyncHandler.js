import { AppError } from "./AppError.js";

export const asyncHandler = (func) => {
    return async (req, res, next) => {
      try {
        return await func(req, res, next);
      } catch (error) {
        return next(new AppError(error.message, 500));
      }
    };
  };