//strings
let message = "Hola, mundo!";
console.log(message);

// concatenación
let greeting = "Hola";
let name = "Juan";
console.log(greeting + " " + name);

// interpolación de cadenas
let age = 25;
console.log(`Hola, mi nombre es ${name} y tengo ${age} años.`);

// metodos comunes de strings
let text = "JavaScript es un lenguaje de programación.";
console.log(text.length);
console.log(text.toUpperCase());
console.log(text.toLowerCase());
console.log(text.includes("lenguaje"));
console.log(text.startsWith("JavaScript"));
console.log(text.endsWith("programación."));
console.log(text.indexOf("es"));
console.log(text.replace("JavaScript", "JS"));
console.log(text.split(" "));
console.log(text.substring(0, 10));
console.log(text.trim());
console.log(text.charAt(5));
console.log(text.repeat(2));
