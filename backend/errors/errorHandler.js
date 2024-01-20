function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: err.message || "Internal Server Error" });

  console.error(err.stack);
  next(err);
}

module.exports = errorHandler;
