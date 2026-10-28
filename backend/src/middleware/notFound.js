import { AppError } from '../utils/AppError.js'

export const notFound = (req, res, next) => {
  const error = new AppError(`Ruta no encontrada: ${req.originalUrl}`, 404)
  next(error)
}
