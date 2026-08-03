document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos HTML
    const form = document.getElementById('personaForm');
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputCorreo = document.getElementById('correo');
    const inputEdad = document.getElementById('edad');
    const tbodyPersonas = document.getElementById('tbodyPersonas');
    const emptyRow = document.getElementById('emptyRow');
    const totalBadge = document.getElementById('totalBadge');
    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    let contadorRegistros = 0;
    let timeoutToast = null;

    // Evento Submit del Formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que se recargue la página

        if (validarFormulario()) {
            // Guardar valores limpios
            const nombres = inputNombres.value.trim();
            const apellidos = inputApellidos.value.trim();
            const correo = inputCorreo.value.trim();
            const edad = inputEdad.value.trim();

            // 1. Agregar nueva fila a la tabla
            agregarPersonaATabla(nombres, apellidos, correo, edad);

            // 2. Mostrar el cuadro de visto de "Persona Registrada"
            mostrarCuadroVisto(`${nombres} ha sido registrado(a) con éxito.`);

            // 3. Limpiar formulario y errores
            form.reset();
            limpiarErrores();
        }
    });

    /**
     * Valida que los campos cumplan con las reglas requeridas.
     */
    function validarFormulario() {
        let esValido = true;
        limpiarErrores();

        // Validar Nombres
        const nombresVal = inputNombres.value.trim();
        if (nombresVal === '') {
            mostrarError(inputNombres, 'errorNombres', 'El nombre es obligatorio.');
            esValido = false;
        } else if (nombresVal.length < 2) {
            mostrarError(inputNombres, 'errorNombres', 'Ingrese un nombre válido.');
            esValido = false;
        }

        // Validar Apellidos
        const apellidosVal = inputApellidos.value.trim();
        if (apellidosVal === '') {
            mostrarError(inputApellidos, 'errorApellidos', 'El apellido es obligatorio.');
            esValido = false;
        } else if (apellidosVal.length < 2) {
            mostrarError(inputApellidos, 'errorApellidos', 'Ingrese un apellido válido.');
            esValido = false;
        }

        // Validar Correo Electrónico
        const correoVal = inputCorreo.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correoVal === '') {
            mostrarError(inputCorreo, 'errorCorreo', 'El correo es obligatorio.');
            esValido = false;
        } else if (!regexEmail.test(correoVal)) {
            mostrarError(inputCorreo, 'errorCorreo', 'Formato de correo no válido.');
            esValido = false;
        }

        // Validar Edad
        const edadVal = parseInt(inputEdad.value.trim(), 10);
        if (isNaN(edadVal)) {
            mostrarError(inputEdad, 'errorEdad', 'La edad es obligatoria.');
            esValido = false;
        } else if (edadVal < 1 || edadVal > 120) {
            mostrarError(inputEdad, 'errorEdad', 'Edad entre 1 y 120 años.');
            esValido = false;
        }

        return esValido;
    }

    /**
     * Marca un input con error y muestra el mensaje.
     */
    function mostrarError(inputElement, errorSpanId, mensaje) {
        inputElement.classList.add('invalid');
        const span = document.getElementById(errorSpanId);
        if (span) {
            span.textContent = mensaje;
        }
    }

    /**
     * Limpia los estados de error en los inputs.
     */
    function limpiarErrores() {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.classList.remove('invalid'));

        const spans = form.querySelectorAll('.error-message');
        spans.forEach(span => span.textContent = '');
    }

    /**
     * Inserta los datos ingresados en la tabla HTML.
     */
    function agregarPersonaATabla(nombres, apellidos, correo, edad) {
        // Remover fila de "No hay registros"
        if (emptyRow && emptyRow.parentNode) {
            emptyRow.remove();
        }

        const tr = document.createElement('tr');

        const tdNombres = document.createElement('td');
        tdNombres.textContent = nombres;

        const tdApellidos = document.createElement('td');
        tdApellidos.textContent = apellidos;

        const tdCorreo = document.createElement('td');
        tdCorreo.textContent = correo;

        const tdEdad = document.createElement('td');
        tdEdad.textContent = edad;

        tr.appendChild(tdNombres);
        tr.appendChild(tdApellidos);
        tr.appendChild(tdCorreo);
        tr.appendChild(tdEdad);

        tbodyPersonas.appendChild(tr);

        // Actualizar contador
        contadorRegistros++;
        totalBadge.textContent = `${contadorRegistros} ${contadorRegistros === 1 ? 'registro' : 'registros'}`;
    }

    /**
     * Despliega la notificación emergente con el visto verde.
     */
    function mostrarCuadroVisto(mensaje) {
        toastMessage.textContent = mensaje;
        toastNotification.classList.add('show');

        if (timeoutToast) clearTimeout(timeoutToast);

        // Ocultar automáticamente tras 3.5 segundos
        timeoutToast = setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3500);
    }
});