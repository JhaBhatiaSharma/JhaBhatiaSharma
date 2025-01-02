// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Logs the full error stack for debugging

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;

