// condicionales

let age = 37
let tieneCedula = true

// tambien se puede utilizar el valor &&, || y otros mas 

if(age > 18 && tieneCedula == true){
    console.log('Eres mayor de edad')
} 
else if(age < 25){
    console.log('Eres joven')
}
else{
    console.log(' Eres menor de edad')
}


// operador ternario
const message = age == 37 ? "la edad es 37" : "la edad no es 37"
console.log(message)

//switch

let day = 0
let dayName

switch(day){

    case 0: 
        dayName = "Lunes"
        break
    case 1: 
        dayName = "Martes"
        break
    case 2: 
        dayName = "Miercoles" 
        break 
    case 1: 
        dayName = "Jueves"
        break
    case 2: 
        dayName = "Viernes"  
        break
    case 1: 
        dayName = "Sabado"
        break
    case 2: 
        dayName = "Domingo"
        break
    default: "El numero de dias es incorrecto"

}


