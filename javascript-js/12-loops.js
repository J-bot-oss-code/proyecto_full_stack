// Bucles
// Permiten repetir instrucciones mientras se cumpla una condicion.

// for: se usa cuando conocemos la cantidad de repeticiones
for (let i = 0; i < 5; i++) {
    console.log("Iteracion:", i)
}

// while: repite mientras la condicion sea verdadera
let counter = 0
while (counter < 3) {
    console.log("while:", counter)
    counter++
}

// do...while: ejecuta el bloque al menos una vez
let number = 0
do {
    console.log("do...while:", number)
    number++
} while (number < 2)

// for...of: recorre los valores de un array o string
let fruits = ["manzana", "pera", "uva"]
for (const fruit of fruits) {
    console.log("Fruta:", fruit)
}

// for...in: recorre las claves enumerables de un objeto
let person = { name: "Jensi", age: 27 }
for (const key in person) {
    console.log(key, person[key])
}

// continue: salta a la siguiente iteracion
for (let i = 0; i < 5; i++) {
    if (i === 2) continue
    console.log("continue:", i)
}

// break: termina el bucle inmediatamente
for (let i = 0; i < 5; i++) {
    if (i === 3) break
    console.log("break:", i)
}
