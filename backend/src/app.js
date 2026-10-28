import express from 'express'
import cors from 'cors'
import jobRoutes from './routes/jobRoutes.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}))

app.use('/api/jobs', jobRoutes)

app.use(notFound)

app.use(errorHandler)

export default app
