import { describe, it, expect } from 'vitest'
import { jobModel } from '../models/jobModel.js'

describe('jobModel', () => {
  it('findAll devuelve los empleos iniciales', () => {
    const jobs = jobModel.findAll()
    expect(jobs).toHaveLength(2)
    expect(jobs[0].id).toBe('1')
  })

  it('findById devuelve el empleo cuando existe', () => {
    const job = jobModel.findById('1')
    expect(job).toBeDefined()
    expect(job.title).toBe('Desarrollador Frontend')
  })

  it('findById devuelve undefined cuando no existe', () => {
    const job = jobModel.findById('999')
    expect(job).toBeUndefined()
  })

  it('create agrega un nuevo empleo y le asigna id', () => {
    const newJob = jobModel.create({
      title: 'DevOps',
      company: 'Cloud Inc',
      location: 'Remoto',
      technology: 'AWS',
      technologies: ['AWS', 'Docker'],
      contract: 'Tiempo completo',
      experience: 'Junior',
      description: 'Infraestructura en la nube.',
      responsibilities: ['Gestionar servidores'],
      requirements: ['Linux', 'AWS'],
      aboutCompany: 'Empresa cloud.',
    })

    expect(newJob.id).toBeDefined()
    expect(newJob.title).toBe('DevOps')
    expect(jobModel.findAll()).toHaveLength(3)
  })

  it('update modifica un empleo existente', () => {
    const updated = jobModel.update('1', {
      title: 'Frontend Senior',
      company: 'Tech Solutions',
      location: 'Remoto',
      technology: 'React',
      technologies: ['React', 'TypeScript'],
      contract: 'Tiempo completo',
      experience: 'Senior',
      description: 'Interfaces avanzadas.',
      responsibilities: ['Liderar frontend'],
      requirements: ['React', 'TypeScript'],
      aboutCompany: 'Tech.',
    })

    expect(updated).not.toBeNull()
    expect(updated.title).toBe('Frontend Senior')
    expect(jobModel.findById('1').title).toBe('Frontend Senior')
  })

  it('update devuelve null cuando el id no existe', () => {
    const result = jobModel.update('999', {
      title: 'X',
      company: 'Y',
      location: 'Z',
      technology: 'A',
      technologies: ['A'],
      contract: 'Tiempo completo',
      experience: 'Junior',
      description: 'd',
      responsibilities: ['r'],
      requirements: ['r'],
      aboutCompany: 'c',
    })
    expect(result).toBeNull()
  })

  it('remove elimina un empleo existente', () => {
    const removed = jobModel.remove('1')
    expect(removed).toBe(true)
    expect(jobModel.findAll()).toHaveLength(1)
    expect(jobModel.findById('1')).toBeUndefined()
  })

  it('remove devuelve false cuando el id no existe', () => {
    const removed = jobModel.remove('999')
    expect(removed).toBe(false)
  })

  it('reset restaura los empleos iniciales', () => {
    jobModel.remove('1')
    jobModel.reset()
    expect(jobModel.findAll()).toHaveLength(2)
  })
})
