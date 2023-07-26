// Almacene todos los inputs en el NodeList "inputs".
const inputs = document.querySelectorAll("input");  

 // Itero el NodeList agregando el escuchador de evento "blur", y llama a funcion validar pasando por parametro el objeto del input.
inputs.forEach(input => { 
    input.addEventListener("blur", () => {
        validar(input);
    })
});

// Declare el objeto "validadores" se utiliza para agrupar diferentes funciones flecha de validación según el tipo de input.
const validadores = {                                // El valor asociado a las propiedades es una función flecha que toma un parámetro input 
    nombre: (input) => validarCampo(input, "nombre", 50) ,         // y luego invoca otra función llamada validarInput pasando el input como argumento.
    email: (input) => validarEmail(input),
    asunto: (input) => validarCampo(input, "asunto", 50),
    mensaje: (input) => validarCampo(input, "mensaje", 300)
}

// Funcion que determina que tipo de input es el que se va validar, recibe por parametro el obejto de input.
function validar(input) {
    const tipoDeInput = input.dataset.tipo         // Se declara la variable "tipoDeInput" que contiene el metadato tipo del input.
    if(validadores[tipoDeInput]) {                 // Si dentro del objeto "validadores" existe un metodo con el mismo nombre que el tipo del input.
        validadores[tipoDeInput](input);           // Se invoca el método pasandole por parametro el objeto del input.
    }
}

// Funcion para validar el input de nombre, recibe por parametro el objeto del input.
function validarCampo(input, tipoCampo, maxCaracteres) {
    const valorCampo = input.value.trim(); // Se declara la constante "valorCampo" obteniendo el valor del input y quitando los espacios en blanco con el metodo trim.
    if (valorCampo === "") {               // Si el usuario no ingresa nada se llama a la funcion mostrarMensajeError, pasando el mensaje correspondiente.
        mostrarMensajeError(input, `El campo ${tipoCampo} no debe estar en blanco.`);
    } else if (valorCampo.length > maxCaracteres) { // Si el usuario excede los 50 caracteres permitidos se llama a la funcion mostrarMensajeError, pasando el mensaje correspondiente.
        mostrarMensajeError(input, `El campo ${tipoCampo} debe tener máximo ${maxCaracteres} caracteres.`);
        input.value = "";
    } else {  // Si el valor es válido, limpiamos los mensajes de error previos.
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-msj-error").innerHTML = "";
    }
}

// Funcion para validar el input de email, recibe por parametro el objeto del input.
function validarEmail(input) {
    const valorEmail = input.value.trim(); // Se declara la constante "valorEmail" obteniendo el valor del input y quitando los espacios en blanco con el metodo trim.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Se declara la constante "emailRegex" la cual almacena una expresion regular para testear el formato del email.
    if (valorEmail === "") {                    // Si el usuario no ingresa nada se llama a la funcion mostrarMensajeError, pasando el mensaje correspondiente.
        mostrarMensajeError(input, `El campo correo electrónico no debe estar en blanco.`);
    } else if (!emailRegex.test(valorEmail)) {  // Si el usuario ingresa un formato erroneo de email se llama a la funcion mostrarMensajeError, pasando el mensaje correspondiente.
        mostrarMensajeError(input, `El campo correo electrónico debe estar en formato válido (ejemplo: texto@texto.com).`);
        input.value = ""; 
    } else {   // Si el valor es válido, limpiamos los mensajes de error previos
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-msj-error").innerHTML = "";
    }
}

// Funcion para mostrar errores, recibe por parametro el input para poder acceder a propiedades del input y modificar el estiloy el mensaje que se quiere mostrar.
function mostrarMensajeError(input, mensaje) {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-msj-error").innerHTML = mensaje;
}