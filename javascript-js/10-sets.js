// Set
// Una coleccion de valores unicos: no guarda elementos duplicados.

// Declaracion
let mySet = new Set()
let mySet2 = new Set([1, 2, 2, 3])

console.log(mySet)
console.log(mySet2) // Set(3) { 1, 2, 3 }

// add (agrega un valor; si ya existe, no lo duplica)
mySet.add("Juan")
mySet.add("JavaScript")
mySet.add("Juan")
console.log(mySet)

// has (comprueba si el valor existe)
console.log(mySet.has("Juan")) // true
console.log(mySet.has("Python")) // false

// delete (elimina un valor y devuelve si pudo eliminarlo)
console.log(mySet.delete("JavaScript")) // true
console.log(mySet)

// size (cantidad de valores)
console.log(mySet.size)

// Iteracion con for...of
for (const value of mySet) {
    console.log(value)
}

// Set tambien puede eliminar duplicados de un array
let numbers = [1, 2, 2, 3, 3, 4]
let uniqueNumbers = [...new Set(numbers)]
console.log(uniqueNumbers) // [1, 2, 3, 4]

// clear (elimina todos los valores)
mySet.clear()
console.log(mySet) // Set(0) {}
