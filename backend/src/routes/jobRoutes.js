import { Router } from 'express'
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js'
import { validateJob } from '../middleware/validate.js'

const router = Router()

router.get('/', getJobs)
router.get('/:id', getJob)
router.post('/', validateJob, createJob)
router.put('/:id', validateJob, updateJob)
router.delete('/:id', deleteJob)

export default router
