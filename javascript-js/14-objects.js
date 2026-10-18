// Objetos
// Agrupan datos relacionados mediante pares de clave y valor.

// Declaracion de un objeto
const person = {
    name: "Jensi",
    age: 27,
    "favorite language": "JavaScript",
}
console.log(person)

// Acceder a propiedades con punto o corchetes
console.log(person.name)
console.log(person["favorite language"])

// Agregar, actualizar y eliminar propiedades
person.city = "Madrid"
person.age = 28
delete person.city
console.log(person)

// Las propiedades tambien pueden guardar funciones; se llaman metodos
const user = {
    name: "Ana",
    greet() {
        return `Hola, soy ${this.name}`
    },
}
console.log(user.greet())

// Shorthand: usar una variable como valor cuando coinciden sus nombres
const name = "Luis"
const age = 30
const anotherPerson = { name, age }
console.log(anotherPerson)

// Object.keys, values y entries devuelven claves, valores y pares
console.log(Object.keys(person))
console.log(Object.values(person))
console.log(Object.entries(person))

// Desestructuracion: guardar propiedades en variables
const { name: personName, age: personAge } = person
console.log(personName, personAge)

// Spread: copiar propiedades y crear un objeto con cambios
const updatedPerson = { ...person, age: 29 }
console.log(updatedPerson)
console.log(person) // El objeto original no cambia
