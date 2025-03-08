import estudiante from "./estudiante.js";

/**
 * ## Clase ListaEstudiantes
 * 
 * Esta clase gestiona una lista de estudiantes (instancias de la clase `estudiante`).
 */
export default class listaEstudiantes {
    #alumnos;

    /**
     * ### Constructor
     * 
     * Crea una nueva instancia de la clase `listaEstudiantes` inicializando el atributo `#alumnos` como un array vacío o cargando los datos desde `localStorage`.
     */
    constructor() {
        this.#alumnos = [];
        this.cargarEstudiantes(); // Cargar datos al inicializar

    }

    /** @returns {Array} Lista de alumnos. */
    get alumnos() {
        return this.#alumnos;
    }

    /**
     * Añade un nuevo alumno a la lista de estudiantes si no existe en la lista.
     * 
     * @param {estudiante} alumno - Instancia de la clase `estudiante` que será añadida a la lista.
     * 
     * @throws {Error} Si el alumno ya está en la lista.
     */
    agregarAlumnos(alumno) {
        if (this.#alumnos.some(alumn => alumn.id === alumno.id)) {
            throw new Error("El alumno que intentas meter ya está en la lista");
        }
        this.#alumnos.push(alumno);
        let hoy = new Date();
        alumno.fechaDeMatriculacion = hoy.toLocaleDateString("es-ES");
    }

    /**
     * Elimina un alumno de la lista por nombre y registra la fecha de desmatriculación.
     * 
     * @param {string} nombre - Nombre del alumno a eliminar.
     */
    eliminarAlumnos(nombre) {
        this.#alumnos.forEach(alumn => {
            if (alumn.nombre === nombre) {
                let hoy = new Date();
                alumn.fechaDeDesmatriculacion = hoy.toLocaleDateString("es-ES");
            }
        });
        this.#alumnos = this.#alumnos.filter(element => element.nombre !== nombre);
        this.guardarEstudiantes(); // Guardar en localStorage después de eliminar
    }

    /**
     * Desmatricula a un alumno de una asignatura específica.
     * 
     * @param {number} id - ID del estudiante.
     * @param {string} nombre - Nombre de la asignatura.
     */
    desmatricularaAsignatura(id, nombre) {
        this.#alumnos.forEach(alum => {
            if (alum.id === id) {
                alum.desmatricularAsignatura(nombre);
            }
        });
    }

    /**
     * Matricula a un alumno en una asignatura específica.
     * 
     * @param {number} id - ID del estudiante.
     * @param {string} nombre - Nombre de la asignatura.
     */
    matricularAsignatura(id, nombre) {
        this.#alumnos.forEach(alum => {
            if (alum.id === id) {
                alum.matricularAsignatura(nombre);
            }
        });
    }

    /**
     * Genera un reporte con los datos de los estudiantes, incluyendo las asignaturas, calificaciones y promedios.
     * 
     * @returns {string} Reporte con la información de los estudiantes.
     */
    reporte() {
        let cadena = '';
        this.#alumnos.forEach(estudiante => {
            cadena += `Estudiante: ${estudiante.nombre}, ID: ${estudiante.id}\n`;
            cadena += `Asignaturas:\n`;
            estudiante.listaModulos.lista.forEach(asignatura => {
                cadena += `  - ${asignatura.toString()}:\n\t\t\t Promedio: ${asignatura.promedio().toFixed(2)}\n`;
            });
            cadena += '\n';
        });
        return cadena;
    }

    /**
     * Busca los estudiantes cuyo nombre coincida con el patrón proporcionado.
     * 
     * @param {string} patron - Patrón de búsqueda para el nombre del estudiante.
     * 
     * @returns {string} Lista de estudiantes cuyo nombre coincide con el patrón.
     * 
     * @throws {Error} Si el patrón no es una cadena.
     */
    buscarEstudiantePorNombre(patron) {
        if (typeof patron !== "string") {
            throw new Error("El patrón debe ser una cadena de texto");
        }
        const regex = new RegExp(patron.toLowerCase(), "i");
        return this.#alumnos.filter(alumn => regex.test(alumn.nombre.toLowerCase()))
            .map(element => element.nombre)
            .join('\n');
    }

    /**
     * Añade una calificación a un estudiante en una asignatura específica.
     * 
     * @param {string} nombre - Nombre del estudiante.
     * @param {string} asignatura - Nombre de la asignatura.
     * @param {number} nota - Calificación a añadir (debe estar entre 0 y 10).
     */
    aniadirCalifiacion(nombre, asignatura, nota) {
        this.#alumnos.forEach(alum => {
            if (alum.nombre === nombre) {
                alum.aniadirCalificaciones(asignatura, parseInt(nota));
            }
        });
    }

    /**
     * Calcula el promedio exacto de todas las asignaturas de un estudiante específico.
     * 
     * @param {string} nombre - Nombre del estudiante.
     * 
     * @returns {number} Promedio exacto del estudiante.
     * 
     * @throws {Error} Si el estudiante no se encuentra en la lista.
     */
    calcularPromedioAlumnoExacto(nombre) {
        const estudiante = this.#alumnos.find(alum => alum.nombre === nombre);
        if (estudiante) {
            return estudiante.calcularPromedio();
        } else {
            throw new Error("Estudiante no encontrado.");
        }
    }

    /**
     * Busca las asignaturas que contengan el patrón proporcionado en su nombre.
     * 
     * @param {string} patron - Patrón de búsqueda para las asignaturas.
     * 
     * @returns {string} Lista de asignaturas que coinciden con el patrón.
     */
    buscarAsignaturasPorNombre(patron) {
        let cadena = 'Asignaturas : \n';
        this.#alumnos.forEach(estudiante => {
            cadena += estudiante.buscarAsignaturaPorNombre(patron) + " \n";
        });
        return cadena;
    }

    /**
     * Calcula el promedio de la clase, basado en el promedio de cada estudiante.
     * 
     * @returns {string} Promedio de la clase.
     */
    calcularPromedioClase() {
        let media = 0;
        let contador = 0;
        this.#alumnos.forEach(alumn => {
            if (!isNaN(alumn.calcularPromedio())) {
                media += alumn.calcularPromedio();
                contador++;
            }
        });
        return (media / contador).toFixed(2);
    }

    /**
     * Guarda la lista de estudiantes en `localStorage`.
     */

    /**
     * Carga la lista de estudiantes desde `localStorage`.
     * 
     * @returns {Array|null} Lista de estudiantes cargada o `null` si no hay datos.
  

    /**
     * Muestra los datos de todos los estudiantes en la lista.
     */
    toString() {
        return this.#alumnos.map(alumn => alumn.toString()).join("\n");
    }

    guardarEstudiantes() {
        const estudiantesJSON = JSON.stringify(this.#alumnos.map(estudiante => estudiante.toJSON()));
        localStorage.setItem('estudiantes', estudiantesJSON);
    }

    /**
     * Carga la lista de estudiantes desde `localStorage`.
     */
    cargarEstudiantes() {
        const estudiantesJSON = localStorage.getItem('estudiantes');
        if (estudiantesJSON) {
            const estudiantesData = JSON.parse(estudiantesJSON);
            this.#alumnos = estudiantesData.map(estudianteData => estudiante.fromJSON(estudianteData));
        }
    }
}