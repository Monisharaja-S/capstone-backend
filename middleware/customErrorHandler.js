import CustomError from "../utils/error.js";

const customErrorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    err = new CustomError("Duplicate Field Value Entered", 404);
  }

  if (err.name === "SyntaxError") {
    err = new CustomError("Unexpected Syntax", 400);
  }

  if (err.name === "ValidationError") {
    err = new CustomError(err.message, 400);
  }

  if (err.name === "CastError") {
    err = new CustomError("Please provide a valid ID", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new CustomError("JWT token has expired", 401);
  }

  if (err.name === "JsonWebTokenError") {
    err = new CustomError("JWT token is malformed", 401);
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

export default customErrorHandler;