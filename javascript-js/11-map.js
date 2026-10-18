// Map
// Coleccion de pares clave-valor. Las claves pueden ser de cualquier tipo.

// Declaracion
let myMap = new Map()
let myMap2 = new Map([
    ["name", "Juan"],
    ["age", 27],
])

console.log(myMap)
console.log(myMap2)

// set (agrega o actualiza un par clave-valor)
myMap.set("name", "Jensi")
myMap.set("age", 27)
myMap.set(1, "una clave numerica")
console.log(myMap)

// get (obtiene el valor asociado a una clave)
console.log(myMap.get("name")) // "Jensi"
console.log(myMap.get(1)) // "una clave numerica"

// has (comprueba si existe una clave)
console.log(myMap.has("age")) // true
console.log(myMap.has("email")) // false

// size (cantidad de pares clave-valor)
console.log(myMap.size)

// delete (elimina el par asociado a una clave)
console.log(myMap.delete("age")) // true
console.log(myMap)

// Iteracion con for...of: cada elemento contiene [clave, valor]
for (const [key, value] of myMap) {
    console.log(key, value)
}

// keys, values y entries permiten recorrer claves, valores o pares
console.log([...myMap.keys()])
console.log([...myMap.values()])
console.log([...myMap.entries()])

// Las claves tambien pueden ser objetos
let user = { id: 1 }
myMap.set(user, "usuario")
console.log(myMap.get(user)) // "usuario"

// clear (elimina todos los pares)
myMap.clear()
console.log(myMap) // Map(0) {}
