import Direccion from "./direccion.js";
import nombre from "./nombre.js";
import Asignatura from "./asignatura.js";
import estudiante from "./estudiante.js";
import listaAsignaturas from "./listaAsignaturas.js";
import listaEstudiantes from "./listaEstudiante.js";

let lista = new listaEstudiantes(); // La lista se carga automáticamente desde localStorage

document.addEventListener('DOMContentLoaded', () => {
    console.log(lista.toString());

    const agregarEstudianteBtn = document.getElementById('agregarEstudianteBtn');
    const eliminarEstudianteBtn = document.getElementById('eliminarEstudianteBtn');
    const matricularrEstudianteBtn = document.getElementById('matricularEstudianteBtn');
    const formularioAgregarEstudiante = document.getElementById('formularioAgregarEstudiante');
    const formularioEliminarEstudiante = document.getElementById('formularioEliminarEstudiante');
    const formularioMatricularEstudiante = document.getElementById('formularioMatricularEstudiante');
    const formularioDesatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
    const nuevoEstudianteForm = document.getElementById('nuevoEstudianteForm');
    const nuevoCalifiacionForm = document.getElementById('aniadirCalificacionform');
    const eliminarEstudianteForm = document.getElementById('eliminarEstudianteForm');
    const cancelarForm = document.getElementById('cancelarForm');
    const resultadoContainer = document.getElementById('resultadoContainer');
    const guardarEstudiantesBtn = document.getElementById('guardarEstudiantesBtn');
    const formularioDesMatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
    const formularioAniadirCalifiacion = document.getElementById('formularioaniadirCalifiacion');
    const formularioCalcularPromedio = document.getElementById('formulariocalcularPromedio');
    const formularioBuscarAsignaturas = document.getElementById('formulariobuscarAsignaturas');
    const formularioMostrarEstudiantes = document.getElementById('formularioMostrarEstudiantes');
    const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');


    // Mostrar estudiantes al cargar la página
    mostrarEstudiantes();

    // Mostrar formulario de agregar estudiante
    agregarEstudianteBtn.addEventListener('click', () => {
        formularioAgregarEstudiante.classList.remove('hidden');
        formularioEliminarEstudiante.classList.add('hidden');
        document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
    });


    // Mostrar formulario de eliminar estudiante
    eliminarEstudianteBtn.addEventListener('click', () => {
        formularioEliminarEstudiante.classList.remove('hidden');
        formularioAgregarEstudiante.classList.add('hidden');
        document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
    });


    // Ocultar formulario de agregar estudiante
    const cancelarForms = document.querySelectorAll('#cancelarForm');

    cancelarForms.forEach(btn => {
        btn.addEventListener('click', () => {
            formularioAgregarEstudiante.classList.add('hidden');
            formularioEliminarEstudiante.classList.add('hidden');
            formularioMatricularEstudiante.classList.add('hidden');
            formularioDesMatricularEstudiante.classList.add('hidden');
            formularioAniadirCalifiacion.classList.add('hidden');
            formularioCalcularPromedio.classList.add('hidden');
            formularioBuscarAsignaturas.classList.add('hidden');
            formularioMostrarEstudiantes.classList.add('hidden');
            formularioBuscarEstudiante.classList.add('hidden');
        });
    });
    



    // Manejar el envío del formulario de agregar estudiante
    nuevoEstudianteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Obtener los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const edad = parseInt(document.getElementById('edad').value);
        const calle = document.getElementById('calle').value;
        const numero = document.getElementById('numero').value;
        const piso = document.getElementById('piso').value;
        const codigoPostal = document.getElementById('codigoPostal').value;
        const provincia = document.getElementById('provincia').value;
        const localidad = document.getElementById('localidad').value;

        // Crear la dirección y el estudiante
        const direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
        const nuevoEstudiante = new estudiante(nombre, edad, direccion);

        // Agregar el estudiante a la lista
        lista.agregarAlumnos(nuevoEstudiante);

        // Mostrar mensaje de éxito
        resultadoContainer.innerHTML = `<p>Estudiante ${nombre} agregado correctamente.</p>`;
        mostrarEstudiantes(); // Actualizar la lista

        // Ocultar el formulario y limpiarlo
        formularioAgregarEstudiante.classList.add('hidden');
        nuevoEstudianteForm.reset();
    });

    // Manejar el envío del formulario de eliminar estudiante
    eliminarEstudianteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Obtener el nombre del estudiante a eliminar
        const nombreEliminar = document.getElementById('nombreEliminar').value;

        // Eliminar el estudiante
        lista.eliminarAlumnos(nombreEliminar);

        // Mostrar mensaje de éxito
        resultadoContainer.innerHTML = `<p>Estudiante ${nombreEliminar} eliminado correctamente.</p>`;
        mostrarEstudiantes(); // Actualizar la lista

        // Ocultar el formulario y limpiarlo
        formularioEliminarEstudiante.classList.add('hidden');
        eliminarEstudianteForm.reset();
    });

    // Función para mostrar la lista de estudiantes
    function mostrarEstudiantes() {
        const listaEstudiantesContainer = document.getElementById('listaEstudiantesContainer');
        listaEstudiantesContainer.innerHTML = '<h2>Lista de Estudiantes</h2>';
        if (lista.alumnos.length === 0) {
            listaEstudiantesContainer.innerHTML += '<p>No hay estudiantes en la lista.</p>';
        } else {
            lista.alumnos.forEach(est => {
                listaEstudiantesContainer.innerHTML += `<p>(${est.id}) ${est.nombre} (${est.edad} años)</p>`;
            });
        }
    }

    // Función para guardar la lista en localStorage




    // Botón para mostrar el formulario de matrícula
    document.getElementById('matricularEstudianteBtn').addEventListener('click', () => {
        const formularioMatricularEstudiante = document.getElementById('formularioMatricularEstudiante');
        if (formularioMatricularEstudiante) {
            formularioMatricularEstudiante.classList.remove('hidden');
            formularioAgregarEstudiante.classList.add('hidden');
            formularioEliminarEstudiante.classList.add('hidden');
        }
    });

    // Manejar el envío del formulario de matrícula
    document.getElementById('matricularEstudianteForm')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreEstudiante = parseInt(document.getElementById('estudianteid').value.trim());
        const nombreAsignatura = document.getElementById('asignaturaMatricular').value.trim();
        const Calificaciones = parseInt(document.getElementById('Calificaciones').value);

        if (!nombreEstudiante || !nombreAsignatura || isNaN(Calificaciones) || Calificaciones < 0) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        // Obtener las calificaciones ingresadas


        // Crear la asignatura y matricular al estudiante
        const asignatura = new Asignatura(nombreAsignatura, Calificaciones);
        console.log(asignatura.toString());

        lista.matricularAsignatura(nombreEstudiante, asignatura);
        console.log(lista.reporte());

        alert(`El estudiante ${nombreEstudiante} ha sido matriculado en ${nombreAsignatura}.`);

        // Limpiar el formulario
        formularioMatricularEstudiante.classList.add('hidden');

        document.getElementById('matricularEstudianteForm').reset();
        document.getElementById('calificacionesContainer').innerHTML = ''; // Limpiar contenedor de calificaciones
    });


    document.getElementById('desMatricularEstudianteBtn').addEventListener('click', () => {
        const formularioMatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
        if (formularioMatricularEstudiante) {
            formularioMatricularEstudiante.classList.remove('hidden');
            formularioAgregarEstudiante.classList.add('hidden');
            formularioEliminarEstudiante.classList.add('hidden');
        }
    });

    document.getElementById('formularioDesMatricularEstudiante')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreEstudiante = parseInt(document.getElementById('estudianteid').value.trim());
        const nombreAsignatura = document.getElementById('asignaturaMatricular').value.trim();
        const Calificaciones = parseInt(document.getElementById('Calificaciones').value);

        if (!nombreEstudiante || !nombreAsignatura || isNaN(Calificaciones) || Calificaciones < 0) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        lista.desmatricularaAsignatura(nombreEstudiante, asignatura);

        alert(`El estudiante ${nombreEstudiante} ha sido matriculado en ${nombreAsignatura}.`);

        // Limpiar el formulario
        // Limpiar y ocultar el formulario
        const formularioDesMatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
        if (formularioDesMatricularEstudiante) {
            formularioDesMatricularEstudiante.classList.add('hidden'); // Ocultar el formulario
        }

        // Limpiar los campos del formulario
        document.getElementById('formularioDesMatricularEstudiante').reset();
    });

    document.getElementById('formularioDesMatricularEstudiante')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreEstudiante = parseInt(document.getElementById('estudianteid').value.trim());
        const nombreAsignatura = document.getElementById('asignaturaMatricular').value.trim();
        const Calificaciones = parseInt(document.getElementById('Calificaciones').value);

        if (!nombreEstudiante || !nombreAsignatura || isNaN(Calificaciones) || Calificaciones < 0) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        lista.desmatricularaAsignatura(nombreEstudiante, asignatura);

        alert(`El estudiante ${nombreEstudiante} ha sido matriculado en ${nombreAsignatura}.`);

        // Limpiar el formulario
        // Limpiar y ocultar el formulario
        const formularioDesMatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
        if (formularioDesMatricularEstudiante) {
            formularioDesMatricularEstudiante.classList.add('hidden'); // Ocultar el formulario
        }

        // Limpiar los campos del formulario
        document.getElementById('formularioDesMatricularEstudiante').reset();
    });


    // Cancelar el formulario de matrícula
    document.getElementById('cancelarMatricularEstudiante')?.addEventListener('click', () => {
        const formularioMatricularEstudiante = document.getElementById('formularioMatricularEstudiante');
        if (formularioMatricularEstudiante) {
            formularioMatricularEstudiante.classList.add('hidden');
        }
    });
    // Mostrar el formulario de añadir calificación cuando se hace clic en el botón
    document.getElementById('aniadirCalificacionBtn')?.addEventListener('click', () => {
        const formularioAniadirCalificacion = document.getElementById('formularioaniadirCalifiacion');
        if (formularioAniadirCalificacion) {
            formularioAniadirCalificacion.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
        }
    });

    // Cancelar el formulario de añadir calificación
    document.getElementById('cancelarMatricularEstudiante')?.addEventListener('click', () => {
        const formularioAniadirCalificacion = document.getElementById('formularioaniadirCalifiacion');
        if (formularioAniadirCalificacion) {
            formularioAniadirCalificacion.classList.add('hidden'); // Ocultar el formulario
            document.getElementById('aniadirCalificacionform').reset(); // Limpiar el formulario
        }
    });

    // Manejar el envío del formulario de añadir calificación
    document.getElementById('aniadirCalificacionform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const nombreEstudiante = document.getElementById('nombreEstudiante').value.trim();
        const nombreAsignatura = document.getElementById('asignatura').value.trim();
        const calificacion = parseInt(document.getElementById('califiaciones').value);

        console.log(calificacion);

        if (!nombreEstudiante || !nombreAsignatura || calificacion < 0 || calificacion > 10) {
            alert("Por favor, completa todos los campos correctamente. La calificación debe estar entre 0 y 10.");
            return;
        }

        try {
            // Buscar al estudiante por nombre
            const estudiante = lista.alumnos.find(est => est.nombre === nombreEstudiante);
            if (!estudiante) {
                throw new Error(`No se encontró al estudiante con nombre: ${nombreEstudiante}`);
            }

            // Buscar la asignatura dentro del estudiante
            const asignatura = estudiante.listaModulos.lista.find(asig => asig.nombre === nombreAsignatura);
            if (!asignatura) {
                throw new Error(`No se encontró la asignatura: ${nombreAsignatura} para el estudiante.`);
            }

            // Añadir la calificación a la asignatura
            asignatura.aniadirCalifiaciones(calificacion);

            // Guardar cambios en localStorage

            // Mostrar mensaje de éxito
            alert(`Calificación ${calificacion} añadida a la asignatura ${nombreAsignatura} para el estudiante ${nombreEstudiante}.`);

            // Ocultar y limpiar el formulario
            const formularioAniadirCalificacion = document.getElementById('formularioaniadirCalifiacion');
            if (formularioAniadirCalificacion) {
                formularioAniadirCalificacion.classList.add('hidden'); // Ocultar el formulario
            }
            document.getElementById('aniadirCalificacionform').reset(); // Limpiar el formulario
        } catch (error) {
            alert(error.message); // Mostrar mensaje de error si algo falla
        }
    });


    // Mostrar el formulario de añadir calificación cuando se hace clic en el botón
    document.getElementById('aniadirCalificacionBtn')?.addEventListener('click', () => {
        const formularioAniadirCalificacion = document.getElementById('formularioaniadirCalifiacion');
        if (formularioAniadirCalificacion) {
            formularioAniadirCalificacion.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
        }
    });

    // Cancelar el formulario de añadir calificación
    document.getElementById('cancelarMatricularEstudiante')?.addEventListener('click', () => {
        const formularioAniadirCalificacion = document.getElementById('formularioaniadirCalifiacion');
        if (formularioAniadirCalificacion) {
            formularioAniadirCalificacion.classList.add('hidden'); // Ocultar el formulario
            document.getElementById('aniadirCalificacionform').reset(); // Limpiar el formulario
        }
    });


    // Mostrar el formulario de calcular promedio cuando se hace clic en el botón
    document.getElementById('calcularPromedioBtn')?.addEventListener('click', () => {
        const formularioCalcularPromedio = document.getElementById('formulariocalcularPromedio');
        if (formularioCalcularPromedio) {
            formularioCalcularPromedio.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioaniadirCalifiacion')?.classList.add('hidden');
        }
    });

    // Cancelar el formulario de calcular promedio
    document.getElementById('cancelarMatricularEstudiante')?.addEventListener('click', () => {
        const formularioCalcularPromedio = document.getElementById('formulariocalcularPromedio');
        if (formularioCalcularPromedio) {
            formularioCalcularPromedio.classList.add('hidden'); // Ocultar el formulario
            document.getElementById('calcularPromedioform').reset(); // Limpiar el formulario
        }
    });

    // Manejar el envío del formulario de calcular promedio
    document.getElementById('calcularPromedioform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const nombreEstudiante = document.getElementById('nombreEstudiantee').value.trim();
        console.log(nombreEstudiante);

        if (!nombreEstudiante) {
            alert("Por favor, ingresa el nombre del estudiante.");
            return;
        }

        try {
            // Buscar al estudiante por nombre
            const estudiante = lista.alumnos.find(est => est.nombre === nombreEstudiante);
            if (!estudiante) {
                throw new Error(`No se encontró al estudiante con nombre: ${nombreEstudiante}`);
            }

            // Calcular el promedio del estudiante
            const promedio = lista.calcularPromedioAlumnoExacto(nombreEstudiante);
            if (isNaN(promedio)) {
                throw new Error(`El estudiante no tiene asignaturas matriculadas.`);
            }

            // Mostrar el promedio
            alert(`El promedio del estudiante ${nombreEstudiante} es: ${promedio.toFixed(2)}`);

            // Ocultar y limpiar el formulario
            const formularioCalcularPromedio = document.getElementById('formulariocalcularPromedio');
            if (formularioCalcularPromedio) {
                formularioCalcularPromedio.classList.add('hidden'); // Ocultar el formulario
            }
            document.getElementById('calcularPromedioform').reset(); // Limpiar el formulario
        } catch (error) {
            alert(error.message); // Mostrar mensaje de error si algo falla
        }
    });


    //

    // Mostrar el formulario de buscar asignaturas cuando se hace clic en el botón
    document.getElementById('buscarAsignaturasbtn')?.addEventListener('click', () => {
        const formularioBuscarAsignaturas = document.getElementById('formulariobuscarAsignaturas');
        if (formularioBuscarAsignaturas) {
            formularioBuscarAsignaturas.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioaniadirCalifiacion')?.classList.add('hidden');
        }
    });

    // Cancelar el formulario de buscar asignaturas
    document.getElementById('cancelarMatricularEstudiante')?.addEventListener('click', () => {
        const formularioBuscarAsignaturas = document.getElementById('formulariobuscarAsignaturas');
        if (formularioBuscarAsignaturas) {
            formularioBuscarAsignaturas.classList.add('hidden'); // Ocultar el formulario
            document.getElementById('buscarAsignaturasform').reset(); // Limpiar el formulario
        }
    });

    // Manejar el envío del formulario de buscar asignaturas
    document.getElementById('buscarAsignaturasform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        // Obtener el nombre del estudiante
        const nombreAsignatura = document.getElementById('asignaturasNombre').value.trim();

        try {
            const resultado = lista.buscarAsignaturasPorNombre(nombreAsignatura);

            if (!resultado || resultado.trim() === "") {
                throw new Error(`No se encontraron asignaturas con el nombre: ${nombreAsignatura}`);
            }

            // Mostrar el resultado en el contenedor HTML
            const resultadoBusquedaContainer = document.getElementById('resultadoBusqueda');
            if (resultadoBusquedaContainer) {
                resultadoBusquedaContainer.innerHTML = `<p>Resultado de la búsqueda:</p><pre>${resultado}</pre>`;
                resultadoBusquedaContainer.classList.add('visible'); // Mostrar el contenedor
            }

            // Ocultar y limpiar el formulario
            const formularioBuscarAsignaturas = document.getElementById('formulariobuscarAsignaturas');
            if (formularioBuscarAsignaturas) {
                formularioBuscarAsignaturas.classList.add('hidden'); // Ocultar el formulario
            }
            document.getElementById('buscarAsignaturasform').reset(); // Limpiar el formulario
        } catch (error) {
            alert(error.message); // Mostrar mensaje de error si algo falla
        }
    });



    //
    // Mostrar el formulario de buscar asignatura cuando se hace clic en el botón
    document.getElementById('mostrarEstudiantesbtn')?.addEventListener('click', () => {
        const resultadoContainer = document.getElementById('resultadoContainer');
        if (resultadoContainer) {
            resultadoContainer.innerHTML = `<p>Estudiantes  "${lista.reporte()}":</p>`;
        }
    });

    // Cancelar el formulario de buscar asignatura
    document.getElementById('cancelarMatricularEstudiante')?.addEventListener('click', () => {
        const formularioMostrarEstudiantes = document.getElementById('formularioMostrarEstudiantes');
        if (formularioMostrarEstudiantes) {
            formularioMostrarEstudiantes.classList.add('hidden'); // Ocultar el formulario
            document.getElementById('mostrarEstudiantesform').reset(); // Limpiar el formulario
        }
    });



    //

    // Mostrar el formulario de buscar asignatura cuando se hace clic en el botón
    document.getElementById('buscarEstudiantebtn')?.addEventListener('click', () => {
        const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');
        if (formularioBuscarEstudiante) {
            formularioBuscarEstudiante.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioaniadirCalifiacion')?.classList.add('hidden');
        }
    });

    // Cancelar el formulario de buscar asignatura
    document.getElementById('cancelarMatricularEstudiante')?.addEventListener('click', () => {
        const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');
        if (formularioBuscarEstudiante) {
            formularioBuscarEstudiante.classList.add('hidden'); // Ocultar el formulario
            document.getElementById('buscarEstudianteform').reset(); // Limpiar el formulario
        }
    });

    // Manejar el envío del formulario de buscar asignatura
    document.getElementById('buscarEstudianteform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const nombreEstudiante = document.getElementById('estudianteBuscar').value.trim();


        try {

            let estudiantes = lista.buscarEstudiantePorNombre(nombreEstudiante);
            // Mostrar los resultados en el contenedor
            const resultadoContainer = document.getElementById('resultadoContainer');
            if (resultadoContainer) {
                resultadoContainer.innerHTML = `<p>Estudiantes encontrados:</p><pre>${estudiantes}</pre>`;
            }
        } catch (error) {
            alert(error.message); // Mostrar mensaje de error si algo falla
        }

        // Ocultar el formulario después de mostrar los resultados
        const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');
        if (formularioBuscarEstudiante) {
            formularioBuscarEstudiante.classList.add('hidden');
        }
    });

    //
    document.getElementById('promedioGeneral')?.addEventListener('click', () => {
        try {
            // Calcular el promedio general de todos los estudiantes


            const resultadoContainer = document.getElementById('resultadoContainer');
            if (resultadoContainer) {
                resultadoContainer.innerHTML = `
                <p>Promedio General de la Clase: ${lista.calcularPromedioClase()}</p>
            `;
            }
        } catch (error) {
            alert(error.message); // Mostrar mensaje de error si algo falla
        }
    });

    guardarEstudiantesBtn.addEventListener('click', () => {
        lista.guardarEstudiantes(); // Guardar la lista en localStorage
        alert("Estudiantes guardados en localStorage.");
    });

});