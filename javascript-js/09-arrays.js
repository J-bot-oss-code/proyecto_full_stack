// array

// declaracion

let myArray = [5]
let myArray2 = new Array(3)

console.log(myArray)
console.log(myArray2)


myArray = [1,2,3,4,5]
myArray2 = new Array(1,2,3,4,5)

console.log(myArray)
console.log(myArray2)

myArray = ["Juan", "DE Los", "Santos", 20]
myArray2 = new Array("Juan", "DE Los", "Santos", 20, true)

console.log(myArray)
console.log(myArray2)


myArray2 = new Array(3)
myArray2[0] = "jensi"
myArray2[1] = "hello"
myArray2[2] = 27

console.log(myArray2)


// metodos comunes

myArray = []

// push y pop
myArray.push("juan")
myArray.push("hero")
myArray.push("20")
myArray.push("15")
console.log(myArray)

console.log(myArray.pop()) // elimina el ultimo y lo devuelve 
myArray.pop()

console.log(myArray)

// shift (elimina el primer elemento de la variable)
console.log(myArray.shift())

//unshift (agrega mas valores)
myArray.unshift("carro", "motor", 34)

// length
console.log(myArray.length)

// clear 
myArray.length = 0 //alternativa, no preferible usar 

// slice ( genera un nuevo array de los viejos pero con los elementos que tu quieres)

myArray = ["Juan", "DE Los", "Santos", 20]
let myNewArray = myArray.slice(1,3)










