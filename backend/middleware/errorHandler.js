// middleware/errorHandler.js
//
// Express error-handling middleware must have exactly 4 arguments.
// Express identifies it as an error handler by the (err, req, res, next) signature.
// It is registered LAST in server.js, after all routes.
//
// Our controllers respond directly, so this only fires if an
// unexpected runtime error is thrown (e.g. a JS crash before res.json runs).

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
