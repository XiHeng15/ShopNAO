const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation Error',
        details: Object.values(err.errors).map(e => e.message)
      }
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: { message: 'Invalid token' }
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: { message: 'Duplicate field value entered' }
    });
  }

  // Default to 500 server error
  res.status(500).json({
    success: false,
    error: { message: 'Internal server error' }
  });
};

module.exports = errorHandler;