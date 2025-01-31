// middleware/errorHandler.js

// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Logs the full error stack for debugging

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
