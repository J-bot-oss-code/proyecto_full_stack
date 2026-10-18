
// string (cadena de texto) sifnifica que es un valor de texto
let nombre = "Juan";
console.log(nombre)

// number (número) significa que es un valor numérico
let edad = 30;
console.log(edad)

// boolean (booleano) significa verdadero o falso
let esEstudiante = true;
console.log(esEstudiante)

// undefined (indefinido) significa que no tiene valor, es un valor no definido
let ciudad;
console.log(ciudad)

// null (nulo) significa que no tiene valor, es un valor intencionalmente vacío
let direccion = null;
console.log(direccion)

//double (doble) significa que es un valor numérico con decimales
let precio = 19.99;
console.log(precio)

// float (flotante) significa que es un valor numérico con decimales
let altura = 1.75;
console.log(altura)

// symbol (símbolo) significa que es un valor único e inmutable
let id = Symbol("id");
console.log(id)

// bigint (entero grande) significa que es un valor numérico entero muy grande
let numeroGrande = 9007199254740991n;
console.log(numeroGrande)

// vamos a imprimir todos los tipos de datos usando typeof para ver el tipo de dato que es cada variable
console.log(typeof nombre) // string
console.log(typeof edad) // number
console.log(typeof esEstudiante) // boolean
console.log(typeof ciudad) // undefined
console.log(typeof direccion) // object
console.log(typeof precio) // number
console.log(typeof altura) // number
console.log(typeof id) // symbol
console.log(typeof numeroGrande) // bigint