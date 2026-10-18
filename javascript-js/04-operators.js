//operadores

//operadores aritmeticos
let a = 10;
let b = 5;

console.log("Suma: " + (a + b));
console.log("Resta: " + (a - b));
console.log("Multiplicación: " + (a * b));
console.log("División: " + (a / b));
console.log("Módulo: " + (a % b));
console.log("Exponenciación: " + (a ** b));
console.log("Incremento: " + (++a));
console.log("Decremento: " + (--b));

 //operadores de asignación
let c = 10;
c += 5;
console.log("Asignación suma: " + c);
c -= 3;
console.log("Asignación resta: " + c);
c *= 2;
console.log("Asignación multiplicación: " + c);
c /= 2;
console.log("Asignación división: " + c);

//operadores de comparación
console.log("Igualdad: " + (a === b));
console.log("Desigualdad: " + (a !== b));
console.log("Mayor que: " + (a > b));
console.log("Menor que: " + (a < b));
console.log("Mayor o igual que: " + (a >= b));
console.log("Menor o igual que: " + (a <= b));

//operadores lógicos

// and (&&), or (||), not (!)
console.log( 5 > 3 && 2 < 4); // true
console.log( 4 > 5 && 5 > 4)

console.log( 5 > 3 || 2 < 4); 
console.log( 4 > 5 || 5 > 4)

console.log(!( 5 > 3 || 2 < 4))
console.log(!( 4 > 5 || 5 > 4))

// operadores ternarios

const le_duele = true

le_duele ? console.log(" si le duele") : console.log('no le duele')

