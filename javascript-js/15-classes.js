// Clases
// Una clase es una plantilla para crear objetos con datos y comportamiento.

// Declaracion de una clase y su constructor
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    // Metodo de instancia
    greet() {
        return `Hola, soy ${this.name}`
    }
}

const person = new Person("Jensi", 27)
console.log(person.greet())
console.log(person.age)

// Propiedad privada: solo se puede usar dentro de la clase
class BankAccount {
    #balance

    constructor(initialBalance = 0) {
        this.#balance = initialBalance
    }

    deposit(amount) {
        this.#balance += amount
    }

    get balance() {
        return this.#balance
    }
}

const account = new BankAccount(100)
account.deposit(50)
console.log(account.balance) // 150

// Getter y setter: permiten leer o validar una propiedad
class Temperature {
    constructor(celsius) {
        this.celsius = celsius
    }

    get fahrenheit() {
        return (this.celsius * 9) / 5 + 32
    }

    set fahrenheit(value) {
        this.celsius = ((value - 32) * 5) / 9
    }
}

const temperature = new Temperature(20)
console.log(temperature.fahrenheit) // 68
temperature.fahrenheit = 86
console.log(temperature.celsius) // 30

// Metodo estatico: pertenece a la clase, no a cada instancia
class MathHelper {
    static square(number) {
        return number * number
    }
}

console.log(MathHelper.square(4))
