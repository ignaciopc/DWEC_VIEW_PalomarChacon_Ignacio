
import Direccion from "../src/direccion.js";
import nombre from "../src/nombre.js";
import Asignatura from "../src/asignatura.js";
import estudiante from "../src/estudiante.js";
import listaAsignaturas from "../src/listaAsignaturas.js";
import listaEstudiantes from "../src/listaEstudiante.js";

 let listaDeAsignaturas = new listaAsignaturas();
 let lista = new listaEstudiantes();

document.addEventListener('DOMContentLoaded', () => {
    const agregarEstudianteBtn = document.getElementById('agregarEstudianteBtn');
    const formularioAgregarEstudiante = document.getElementById('formularioAgregarEstudiante');
    const nuevoEstudianteForm = document.getElementById('nuevoEstudianteForm');
    const cancelarAgregarEstudianteBtn = document.getElementById('cancelarAgregarEstudiante');
    const resultadoContainer = document.getElementById('resultadoContainer');

    // Mostrar formulario al hacer clic en "Agregar Estudiante"
    agregarEstudianteBtn.addEventListener('click', () => {
        formularioAgregarEstudiante.classList.remove('hidden');
    });

    // Ocultar formulario al hacer clic en "Cancelar"
    cancelarAgregarEstudianteBtn.addEventListener('click', () => {
        formularioAgregarEstudiante.classList.add('hidden');
    });

    // Manejar el envío del formulario
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
        console.log(lista.toString());
        
        // Ocultar el formulario
        formularioAgregarEstudiante.classList.add('hidden');

        // Limpiar el formulario
        nuevoEstudianteForm.reset();
    });
});