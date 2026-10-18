// Funciones
// Agrupan instrucciones reutilizables y pueden recibir datos y devolver resultados.

// Declaracion de funcion
function greet(name) {
    return `Hola, ${name}!`
}
console.log(greet("Jensi"))

// Parametros con valores predeterminados
function add(a, b = 0) {
    return a + b
}
console.log(add(3, 4))
console.log(add(5))

// Funcion como expresion: se asigna a una variable
const multiply = function (a, b) {
    return a * b
}
console.log(multiply(3, 4))

// Funcion flecha: forma breve de escribir una funcion
const subtract = (a, b) => a - b
console.log(subtract(10, 3))

// Si hay un solo parametro, los parentesis son opcionales
const double = number => number * 2
console.log(double(6))

// Una funcion flecha con varias instrucciones necesita llaves y return
const getFullName = (firstName, lastName) => {
    const fullName = `${firstName} ${lastName}`
    return fullName
}
console.log(getFullName("Jensi", "Santos"))

// Una funcion puede llamar a otra funcion
function square(number) {
    return number * number
}
function sumOfSquares(a, b) {
    return square(a) + square(b)
}
console.log(sumOfSquares(3, 4))
