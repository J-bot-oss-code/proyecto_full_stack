// Programacion orientada a objetos (POO)
// Organiza un programa usando objetos que combinan datos y comportamiento.

// Encapsulacion: proteger el estado interno y controlar como se modifica
class Counter {
    #value = 0

    increase() {
        this.#value++
    }

    get value() {
        return this.#value
    }
}

const counter = new Counter()
counter.increase()
console.log(counter.value)

// Abstraccion: exponer una operacion sencilla y ocultar sus pasos internos
class CoffeeMachine {
    makeCoffee() {
        this.#boilWater()
        return "Cafe listo"
    }

    #boilWater() {
        console.log("Calentando agua...")
    }
}

const machine = new CoffeeMachine()
console.log(machine.makeCoffee())

// Polimorfismo: distintos objetos responden al mismo metodo a su manera
class Circle {
    constructor(radius) {
        this.radius = radius
    }

    area() {
        return Math.PI * this.radius ** 2
    }
}

class Rectangle {
    constructor(width, height) {
        this.width = width
        this.height = height
    }

    area() {
        return this.width * this.height
    }
}

const shapes = [new Circle(2), new Rectangle(3, 4)]
for (const shape of shapes) {
    console.log("Area:", shape.area())
}

// Composicion: construir un objeto usando otros objetos
class Engine {
    start() {
        return "Motor encendido"
    }
}

class Car {
    constructor(engine) {
        this.engine = engine
    }

    start() {
        return this.engine.start()
    }
}

const car = new Car(new Engine())
console.log(car.start())
