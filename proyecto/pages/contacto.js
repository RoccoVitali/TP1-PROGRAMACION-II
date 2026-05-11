document.getElementById('formularioContacto').addEventListener('enviar', function(event) {

    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const estado = document.getElementById('mensajeEstado');

    estado.textContent = "";

    if (nombre.length < 3) {
        estado.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    if (!validarEmail(email)) {
        estado.textContent = "Por favor, ingresá un correo electrónico válido.";
        return;
    }

    if (mensaje.length < 10) {
        estado.textContent = "El mensaje es muy corto, contanos un poco más.";
        return;
    }

    estado.style.color = "green";
    estado.textContent = "¡Gracias! Tu mensaje ha sido enviado con éxito.";
    
    this.reset();
});

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
