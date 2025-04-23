// Funcionalidad del modal de contacto
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalContacto');
    const btnAbrirModal = document.getElementById('abrirModal');
    const btnCerrarModal = document.querySelector('.cerrar-modal');
    const formulario = document.querySelector('.modal .campos-formulario');

    // Abrir el modal
    btnAbrirModal.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    });

    // Cerrar el modal
    btnCerrarModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar el modal con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Validación del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Obtener los campos del formulario
        const nombre = formulario.querySelector('input[type="text"]').value.trim();
        const email = formulario.querySelector('input[type="email"]').value.trim();
        const areaInteres = formulario.querySelector('.selector-servicio').value;
        const asunto = formulario.querySelectorAll('input[type="text"]')[1].value.trim();
        const mensaje = formulario.querySelector('textarea').value.trim();

        // Validar campos
        let errores = [];

        if (nombre === '') {
            errores.push('El nombre es requerido');
        }

        if (email === '') {
            errores.push('El correo electrónico es requerido');
        } else if (!validarEmail(email)) {
            errores.push('El correo electrónico no es válido');
        }

        if (areaInteres === '') {
            errores.push('Debes seleccionar un área de interés');
        }

        if (asunto === '') {
            errores.push('El asunto es requerido');
        }

        if (mensaje === '') {
            errores.push('El mensaje es requerido');
        }

        // Mostrar errores o enviar formulario
        if (errores.length > 0) {
            mostrarErrores(errores);
        } else {
            // Aquí puedes agregar el código para enviar el formulario
            enviarFormulario(nombre, email, areaInteres, asunto, mensaje);
        }
    });

    // Función para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Función para mostrar errores
    function mostrarErrores(errores) {
        // Eliminar mensajes de error anteriores
        const erroresAnteriores = document.querySelectorAll('.error-mensaje');
        erroresAnteriores.forEach(error => error.remove());

        // Crear y mostrar nuevos mensajes de error
        errores.forEach(error => {
            const mensajeError = document.createElement('div');
            mensajeError.className = 'error-mensaje';
            mensajeError.textContent = error;
            mensajeError.style.color = '#ff4444';
            mensajeError.style.marginTop = '5px';
            mensajeError.style.fontSize = '14px';
            formulario.insertBefore(mensajeError, formulario.querySelector('.contenedor-boton'));
        });
    }

    // Función para enviar el formulario
    function enviarFormulario(nombre, email, areaInteres, asunto, mensaje) {
        // Aquí puedes agregar el código para enviar los datos a tu servidor
        console.log('Formulario enviado:', {
            nombre,
            email,
            areaInteres,
            asunto,
            mensaje
        });

        // Mostrar mensaje de éxito
        const mensajeExito = document.createElement('div');
        mensajeExito.className = 'exito-mensaje';
        mensajeExito.textContent = '¡Mensaje enviado con éxito!';
        mensajeExito.style.color = '#4CAF50';
        mensajeExito.style.marginTop = '10px';
        mensajeExito.style.textAlign = 'center';
        mensajeExito.style.fontSize = '16px';
        formulario.insertBefore(mensajeExito, formulario.querySelector('.contenedor-boton'));

        // Limpiar el formulario
        formulario.reset();

        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            mensajeExito.remove();
        }, 2000);
    }
}); 