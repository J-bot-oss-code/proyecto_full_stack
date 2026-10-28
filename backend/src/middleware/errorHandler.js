export const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado'
    error = new AppError(message, 404)
  }

  if (err.code === 11000) {
    const message = 'Valor duplicado en campo único'
    error = new AppError(message, 400)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ')
    error = new AppError(message, 400)
  }

  const statusCode = error.statusCode || 500
  const status = error.status || 'error'

  const response = {
    status,
    message: error.message || 'Error interno del servidor',
  }

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack
    response.error = err
  }

  res.status(statusCode).json(response)
}
