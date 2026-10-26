import os from 'node:os'

console.log('informacion del sistema \n')

console.log('version: ', os.type())
console.log('Plataforma:', os.platform())
console.log('Versión del sistema:', os.release())
console.log('Arquitectura:', os.arch())


