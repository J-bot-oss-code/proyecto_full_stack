// Importa la función de Node.js que permite crear servidores HTTP.
import { createServer } from 'node:http'

// Obtiene el puerto desde el archivo .env o usa 3000 como valor predeterminado.
const port = Number(process.env.PORT || 3000)

// Crea el servidor y define la respuesta para cada solicitud recibida.
const server = createServer((request, response) => {
  // Indica que la solicitud se respondió correctamente y que el contenido es texto.
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  // Envía el mensaje que aparecerá en el navegador.
  response.end('¡Hola! El servidor HTTP está funcionando.\n')
})

// Inicia el servidor en el puerto configurado y muestra la dirección local.
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})