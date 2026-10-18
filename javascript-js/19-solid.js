// Principios SOLID
// Son cinco principios para disenar codigo mas facil de mantener y extender.

// S - Responsabilidad unica: cada clase tiene una responsabilidad principal
class Order {
    constructor(items) {
        this.items = items
    }

    total() {
        return this.items.reduce((sum, item) => sum + item.price, 0)
    }
}

class OrderPrinter {
    print(order) {
        return `Total: $${order.total()}`
    }
}

const order = new Order([{ price: 10 }, { price: 15 }])
console.log(new OrderPrinter().print(order))

// O - Abierto/cerrado: agregar comportamientos sin cambiar el codigo existente
class EmailNotifier {
    send(message) {
        return `Email: ${message}`
    }
}

class SmsNotifier {
    send(message) {
        return `SMS: ${message}`
    }
}

function notify(notifier, message) {
    return notifier.send(message)
}

console.log(notify(new EmailNotifier(), "Pedido enviado"))
console.log(notify(new SmsNotifier(), "Pedido enviado"))

// L - Sustitucion de Liskov: una implementacion debe poder sustituir a otra
class Bird {
    move() {
        return "El ave se mueve"
    }
}

class FlyingBird extends Bird {
    move() {
        return "El ave vuela"
    }
}

class Penguin extends Bird {
    move() {
        return "El pinguino camina y nada"
    }
}

function showMovement(bird) {
    return bird.move()
}

console.log(showMovement(new FlyingBird()))
console.log(showMovement(new Penguin()))

// I - Segregacion de interfaces: no exigir metodos que un objeto no necesita
class BasicPrinter {
    print(document) {
        return `Imprimiendo: ${document}`
    }
}

class MultiFunctionPrinter extends BasicPrinter {
    scan(document) {
        return `Escaneando: ${document}`
    }
}

console.log(new BasicPrinter().print("reporte"))
console.log(new MultiFunctionPrinter().scan("reporte"))

// D - Inversion de dependencias: recibir la dependencia en vez de crearla dentro
class Checkout {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod
    }

    pay(amount) {
        return this.paymentMethod.pay(amount)
    }
}

class CardPayment {
    pay(amount) {
        return `Pago con tarjeta: $${amount}`
    }
}

class CashPayment {
    pay(amount) {
        return `Pago en efectivo: $${amount}`
    }
}

console.log(new Checkout(new CardPayment()).pay(25))
console.log(new Checkout(new CashPayment()).pay(25))
