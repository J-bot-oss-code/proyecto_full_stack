// Manejo de errores
// Permite detectar problemas y responder sin detener inesperadamente el programa.

// throw genera un error cuando una condicion no es valida
function divide(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir entre cero")
    }

    return a / b
}

// try ejecuta el codigo; catch recibe y maneja el error
try {
    console.log(divide(10, 2))
    console.log(divide(10, 0))
} catch (error) {
    console.log("Ocurrio un error:", error.message)
}

// finally se ejecuta tanto si hubo error como si no
try {
    console.log("Intentando una operacion")
    console.log(divide(8, 2))
} catch (error) {
    console.log(error.message)
} finally {
    console.log("La operacion termino")
}

// Una clase propia de error puede aportar un nombre mas especifico
class InvalidAgeError extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidAgeError"
    }
}

function registerUser(name, age) {
    if (age < 18) {
        throw new InvalidAgeError("La edad minima para registrarse es 18")
    }

    return `${name} se registro correctamente`
}

try {
    console.log(registerUser("Ana", 16))
} catch (error) {
    if (error instanceof InvalidAgeError) {
        console.log(`${error.name}: ${error.message}`)
    } else {
        throw error // No ocultar errores que no sabemos manejar
    }
}
