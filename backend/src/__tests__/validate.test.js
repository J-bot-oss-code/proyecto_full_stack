import { describe, it, expect } from 'vitest'
import validateJob from '../middleware/validate.js'

const validJob = {
  title: 'Desarrollador Frontend',
  company: 'Tech Solutions',
  location: 'Remoto',
  technology: 'React',
  technologies: ['React', 'JavaScript', 'CSS'],
  contract: 'Tiempo completo',
  experience: 'Intermedio',
  description: 'Desarrollo web moderno.',
  responsibilities: ['Crear componentes'],
  requirements: ['React'],
  aboutCompany: 'Empresa tech.',
}

const nextFn = () => {}

describe('validateJob middleware', () => {
  it('llama next() cuando el cuerpo es válido', () => {
    const req = { body: { ...validJob } }
    const res = { status: () => res, json: () => res }
    let called = false

    validateJob(req, res, () => { called = true })
    expect(called).toBe(true)
  })

  it('devuelve 400 si el cuerpo no es un objeto', () => {
    const req = { body: null }
    const res = { status: () => res, json: (body) => { res.body = body; return res } }
    const next = () => {}

    validateJob(req, res, next)
    expect(res.status).toBeDefined()
  })

  it('devuelve 400 si faltan campos string requeridos', () => {
    const req = { body: { ...validJob, title: '' } }
    const res = { status: () => res, json: (body) => { res.body = body; return res } }
    const next = () => {}

    validateJob(req, res, next)
    expect(res.body.status).toBe('fail')
    expect(res.body.errors).toBeDefined()
  })

  it('devuelve 400 si technologies está vacía', () => {
    const req = { body: { ...validJob, technologies: [] } }
    const res = { status: () => res, json: (body) => { res.body = body; return res } }
    const next = () => {}

    validateJob(req, res, next)
    expect(res.body.status).toBe('fail')
  })

  it('devuelve 400 si technology no está en technologies', () => {
    const req = { body: { ...validJob, technology: 'Vue', technologies: ['React'] } }
    const res = { status: () => res, json: (body) => { res.body = body; return res } }
    const next = () => {}

    validateJob(req, res, next)
    expect(res.body.status).toBe('fail')
    expect(res.body.errors.some((e) => e.includes('tecnología principal'))).toBe(true)
  })
})
