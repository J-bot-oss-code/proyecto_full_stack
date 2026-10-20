// Desestructuracion, spread y rest
// Desestructurar extrae valores; spread expande elementos y rest los agrupa.

// Desestructuracion de arrays: asigna elementos a variables por posicion
const colors = ["rojo", "verde", "azul"]
const [firstColor, secondColor] = colors
console.log(firstColor, secondColor)

// Omitir elementos y asignar un valor predeterminado
const [mainColor, , thirdColor, fourthColor = "amarillo"] = colors
console.log(mainColor, thirdColor, fourthColor)

// Desestructuracion de objetos: extrae propiedades por nombre
const person = { name: "Jensi", age: 27, city: "Madrid" }
const { name, age } = person
console.log(name, age)

// Renombrar una propiedad al desestructurar
const { name: personName } = person
console.log(personName)

// Asignar valores predeterminados si la propiedad no existe
const { country = "España" } = person
console.log(country)

// Rest en desestructuracion: agrupa las propiedades restantes
const { city, ...otherDetails } = person
console.log(city, otherDetails)

// Spread con arrays: expande elementos para combinar o copiar arrays
const moreColors = ["morado", "naranja"]
const allColors = [...colors, ...moreColors]
const copiedColors = [...colors]
console.log(allColors)
console.log(copiedColors)

// Spread con objetos: copia propiedades; las posteriores reemplazan las anteriores
const updatedPerson = { ...person, age: 28 }
console.log(updatedPerson)
console.log(person) // El objeto original no cambia

// Spread al llamar una funcion: expande los elementos como argumentos
const numbers = [4, 7]
console.log(Math.max(...numbers))

// Rest en parametros: agrupa argumentos en un array
function sum(...values) {
    return values.reduce((total, value) => total + value, 0)
}
console.log(sum(1, 2, 3, 4))

// Rest debe ser el ultimo parametro de la funcion
function introduce(greeting, ...names) {
    return `${greeting}: ${names.join(", ")}`
}
console.log(introduce("Hola", "Ana", "Luis", "Jensi"))
