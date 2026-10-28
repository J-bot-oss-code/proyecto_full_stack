import { describe, it, expect, beforeEach } from 'vitest'
import { errorHandler } from '../middleware/errorHandler.js'
import { AppError } from '../utils/AppError.js'

const req = {}
const res = {
  statusCode: null,
  body: null,
  status(code) { this.statusCode = code; return this },
  json(body) { this.body = body; return this },
}
const next = () => {}

beforeEach(() => {
  res.statusCode = null
  res.body = null
})

describe('errorHandler middleware', () => {
  it('responde con status 500 para error genérico', () => {
    const err = new Error('algo falló')
    errorHandler(err, req, res, next)
    expect(res.statusCode).toBe(500)
    expect(res.body.status).toBe('error')
    expect(res.body.message).toBe('algo falló')
  })

  it('responde con status 404 para AppError 404', () => {
    const err = new AppError('no encontrado', 404)
    errorHandler(err, req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res.body.status).toBe('fail')
  })

  it('incluye stack solo en desarrollo', () => {
    process.env.NODE_ENV = 'development'
    const err = new Error('test')
    errorHandler(err, req, res, next)
    expect(res.body.stack).toBeDefined()

    process.env.NODE_ENV = 'production'
    errorHandler(err, req, res, next)
    expect(res.body.stack).toBeUndefined()
    process.env.NODE_ENV = 'development'
  })
})
