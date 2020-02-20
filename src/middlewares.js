// Middleware recurso não encontrado
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middeware de tratamento de erro
const errorHandling = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    trace: process.env.NODE_ENV === "production" ? "🤓" : error.trace
  });
};

module.exports = {
  notFound,
  errorHandling
};
