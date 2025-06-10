import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";



export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Check for JWT token first
  const token = req.cookies?.token || 
                req.headers?.authorization?.split(' ')[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
      }
      return next();
    } catch (error) {
      // Continue to check session if JWT is invalid
    }
  }

  // If no JWT token, check Passport session
  if (req.isAuthenticated()) {
    return next();
  }

  return next(new ErrorHandler("Not authenticated", 401));
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource.`
        )
      );
    }
    next();
  };
};

