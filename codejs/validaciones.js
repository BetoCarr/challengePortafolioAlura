const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("blur", () => {
        validar(input);
    })
});

function validar(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
}

const validadores = {
    nombre: (input) => validarNombre(input)

}
function validarNombre(input) {
    const valorNombre = input.value.trim();
    const maxCaracteres = 50;
    if (valorNombre === "") {
        mostrarMensajeError(input, `El campo nombre no debe estar en blanco.`);
    } else if (valorNombre.length > maxCaracteres) {
        mostrarMensajeError(input, `El campo nombre debe tener máximo ${maxCaracteres} caracteres.`);
        input.value = "";
    } else {
        // Si el valor es válido, limpiamos los mensajes de error previos
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-msj-error").innerHTML = "";
    }
}

function mostrarMensajeError(input, mensaje) {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-msj-error").innerHTML = mensaje;
}