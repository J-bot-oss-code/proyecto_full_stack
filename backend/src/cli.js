// Lee el primer argumento escrito después del nombre del archivo.
const comando = process.argv[2]

// Lee el segundo argumento y usa "mundo" si no se proporcionó un nombre.
const nombre = process.argv[3] || 'mundo'

// Comprueba si el comando recibido es "saludar".
if (comando === 'saludar') {
  // Muestra un saludo usando el nombre recibido.
  console.log(`¡Hola, ${nombre}!`)
  // Si el comando no fue "saludar", muestra cómo ejecutar este CLI.
} else if (comando === 'despedir') {
  console.log(`Nos vemos luego, ${nombre}`)
} else {
  console.log('Comando no reconocido.')
  console.log('Uso: node src/cli.js saludar|despedir [nombre]')
}

// Ejercicio 1: agrega un comando "despedir" que muestre una despedida.
// Ejercicio 2: agrega un comando "ayuda" que explique los comandos disponibles.
// Ejercicio 3: haz que el saludo también acepte un nombre con espacios.