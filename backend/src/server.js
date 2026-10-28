import app from './app.js'
import { config } from './config/config.js'

const server = app.listen(config.port, () => {
  console.log(`Servidor API escuchando en http://localhost:${config.port}`)
  console.log(`Entorno: ${config.nodeEnv}`)
})

process.on('unhandledRejection', (err) => {
  console.error('Rechazo no manejado:', err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  console.error('Excepción no capturada:', err.name, err.message)
  process.exit(1)
})
