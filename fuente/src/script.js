import Direccion from "./direccion.js";
import nombre from "./nombre.js";
import Asignatura from "./asignatura.js";
import estudiante from "./estudiante.js";
import listaAsignaturas from "./listaAsignaturas.js";
import listaEstudiantes from "./listaEstudiante.js";

let listaDeAsignaturas = new listaAsignaturas();
let lista = new listaEstudiantes(); // La lista se carga automáticamente desde localStorage

document.addEventListener('DOMContentLoaded', () => {
    console.log(lista.toString());

    const agregarEstudianteBtn = document.getElementById('agregarEstudianteBtn');
    const eliminarEstudianteBtn = document.getElementById('eliminarEstudianteBtn');
    const formularioAgregarEstudiante = document.getElementById('formularioAgregarEstudiante');
    const formularioEliminarEstudiante = document.getElementById('formularioEliminarEstudiante');
    const nuevoEstudianteForm = document.getElementById('nuevoEstudianteForm');
    const eliminarEstudianteForm = document.getElementById('eliminarEstudianteForm');
    const cancelarAgregarEstudianteBtn = document.getElementById('cancelarAgregarEstudiante');
    const cancelarEliminarEstudianteBtn = document.getElementById('cancelarEliminarEstudiante');
    const resultadoContainer = document.getElementById('resultadoContainer');

    // Mostrar estudiantes al cargar la página
    mostrarEstudiantes();

    // Mostrar formulario de agregar estudiante
    agregarEstudianteBtn.addEventListener('click', () => {
        formularioAgregarEstudiante.classList.remove('hidden');
        formularioEliminarEstudiante.classList.add('hidden');
    });

    // Mostrar formulario de eliminar estudiante
    eliminarEstudianteBtn.addEventListener('click', () => {
        formularioEliminarEstudiante.classList.remove('hidden');
        formularioAgregarEstudiante.classList.add('hidden');
    });

    // Ocultar formulario de agregar estudiante
    cancelarAgregarEstudianteBtn.addEventListener('click', () => {
        formularioAgregarEstudiante.classList.add('hidden');
    });

    // Ocultar formulario de eliminar estudiante
    cancelarEliminarEstudianteBtn.addEventListener('click', () => {
        formularioEliminarEstudiante.classList.add('hidden');
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
        
        lista.alumnos.forEach(est => {
            listaEstudiantesContainer.innerHTML += `<p>${est.nombre} (${est.edad} años)</p>`;
        });
    }
});