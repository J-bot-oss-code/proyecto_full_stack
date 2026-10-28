import { jobModel } from '../models/jobModel.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { AppError } from '../utils/AppError.js'

export const getJobs = asyncHandler(async (_req, res) => {
  const jobs = jobModel.findAll()
  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: { jobs },
  })
})

export const getJob = asyncHandler(async (req, res, next) => {
  const job = jobModel.findById(req.params.id)

  if (!job) {
    return next(new AppError(`No se encontró un empleo con el ID ${req.params.id}`, 404))
  }

  res.status(200).json({
    status: 'success',
    data: { job },
  })
})

export const createJob = asyncHandler(async (req, res) => {
  const newJob = jobModel.create(req.body)
  res.status(201).json({
    status: 'success',
    data: { job: newJob },
  })
})

export const updateJob = asyncHandler(async (req, res, next) => {
  const job = jobModel.update(req.params.id, req.body)

  if (!job) {
    return next(new AppError(`No se encontró un empleo con el ID ${req.params.id}`, 404))
  }

  res.status(200).json({
    status: 'success',
    data: { job },
  })
})

export const deleteJob = asyncHandler(async (req, res, next) => {
  const deleted = jobModel.remove(req.params.id)

  if (!deleted) {
    return next(new AppError(`No se encontró un empleo con el ID ${req.params.id}`, 404))
  }

  res.status(204).json(null)
})
