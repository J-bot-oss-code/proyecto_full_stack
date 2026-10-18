// Herencia de clases
// Permite crear una clase basada en otra y reutilizar su comportamiento.

// Clase base o padre
class Animal {
    constructor(name) {
        this.name = name
    }

    speak() {
        return `${this.name} hace un sonido`
    }
}

// extends indica que Dog hereda de Animal
class Dog extends Animal {
    constructor(name, breed) {
        super(name) // Llama al constructor de la clase padre
        this.breed = breed
    }

    // Sobrescribe el metodo heredado
    speak() {
        return `${this.name} dice guau`
    }
}

const dog = new Dog("Luna", "Labrador")
console.log(dog.name) // Propiedad heredada
console.log(dog.breed)
console.log(dog.speak()) // Metodo sobrescrito

// Una subclase puede usar un metodo del padre con super
class GuideDog extends Dog {
    constructor(name, breed, owner) {
        super(name, breed)
        this.owner = owner
    }

    introduce() {
        return `${super.speak()} y acompana a ${this.owner}`
    }
}

const guideDog = new GuideDog("Max", "Pastor", "Ana")
console.log(guideDog.introduce())

// instanceof comprueba la relacion de herencia
console.log(dog instanceof Dog) // true
console.log(dog instanceof Animal) // true
