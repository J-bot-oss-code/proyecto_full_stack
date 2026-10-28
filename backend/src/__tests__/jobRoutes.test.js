import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import app from '../app.js'

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

describe('GET /api/jobs', () => {
  it('lista todos los empleos con status 200', async () => {
    const res = await request(app).get('/api/jobs')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.results).toBe(2)
    expect(res.body.data.jobs).toHaveLength(2)
  })
})

describe('GET /api/jobs/:id', () => {
  it('devuelve un empleo por id existente', async () => {
    const res = await request(app).get('/api/jobs/1')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.data.job.id).toBe('1')
  })

  it('devuelve 404 cuando el id no existe', async () => {
    const res = await request(app).get('/api/jobs/999')
    expect(res.status).toBe(404)
    expect(res.body.status).toBe('fail')
  })
})

describe('POST /api/jobs', () => {
  it('crea un empleo y devuelve 201', async () => {
    const res = await request(app).post('/api/jobs').send(validJob)
    expect(res.status).toBe(201)
    expect(res.body.status).toBe('success')
    expect(res.body.data.job.id).toBeDefined()
  })

  it('devuelve 400 si faltan campos requeridos', async () => {
    const res = await request(app).post('/api/jobs').send({ title: 'Solo título' })
    expect(res.status).toBe(400)
    expect(res.body.status).toBe('fail')
  })

  it('devuelve 400 si technology no está en technologies', async () => {
    const res = await request(app).post('/api/jobs').send({
      ...validJob,
      technology: 'Vue',
      technologies: ['React'],
    })
    expect(res.status).toBe(400)
    expect(res.body.status).toBe('fail')
  })
})

describe('PUT /api/jobs/:id', () => {
  it('actualiza un empleo existente y devuelve 200', async () => {
    const res = await request(app).put('/api/jobs/1').send(validJob)
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.data.job.title).toBe(validJob.title)
  })

  it('devuelve 404 cuando el id no existe', async () => {
    const res = await request(app).put('/api/jobs/999').send(validJob)
    expect(res.status).toBe(404)
  })
})

describe('DELETE /api/jobs/:id', () => {
  it('elimina un empleo y devuelve 204', async () => {
    const res = await request(app).delete('/api/jobs/1')
    expect(res.status).toBe(204)
  })

  it('devuelve 404 cuando el id no existe', async () => {
    const res = await request(app).delete('/api/jobs/999')
    expect(res.status).toBe(404)
  })
})

describe('Rutas inexistentes', () => {
  it('devuelve 404 para rutas no definidas', async () => {
    const res = await request(app).get('/api/inexistente')
    expect(res.status).toBe(404)
  })
})
