import nombre from "./nombre.js";
import Direccion from "./direccion.js";
import listaAsignaturas from "./listaAsignaturas.js";

/**
 * ## Clase Estudiante
 * 
 * Representa los datos y funcionalidades relacionadas con un estudiante.
 * 
 * ### Atributos:
 * - **`#id`**: Identificador único para cada estudiante. Asignado automáticamente mediante un contador estático.
 * - **`#edad`**: Edad del estudiante (número entero).
 * - **`#direccion`**: Dirección del estudiante, instancia de la clase `Direccion`.
 * - **`#listaModulos`**: Lista de asignaturas en las que el estudiante está matriculado, gestionada como una instancia de `listaAsignaturas`.
 * - **`#fechaDeMatriculacion`**: Fecha en la que el estudiante fue matriculado.
 * - **`#fechaDeDesmatriculacion`**: Fecha en la que el estudiante fue desmatriculado.
 * - **`contadorID`** (estático): Contador que garantiza la asignación única de IDs.
 * 
 * ### Métodos:
 * - **Getters y Setters**: Para gestionar los atributos privados.
 * - **`matricularAsignatura`**: Matricula al estudiante en una nueva asignatura.
 * - **`desmatricularAsignatura`**: Elimina una asignatura de la lista del estudiante según su nombre.
 * - **`calcularPromedio`**: Calcula el promedio general de todas las asignaturas del estudiante.
 * - **`aniadirCalificaciones`**: Añade una calificación a una asignatura específica.
 * - **`buscarAsignaturaPorNombre`**: Busca asignaturas cuyo nombre contenga un patrón dado.
 * - **`toString`**: Devuelve una representación en cadena con los datos principales del estudiante.
 * - **`toJSON`**: Convierte el objeto a un formato serializable.
 * - **`fromJSON`**: Reconstruye el objeto desde un formato plano.
 */
export default class estudiante extends nombre {
    #id;
    #edad;
    #direccion;
    #listaModulos;
    #fechaDeMatriculacion;
    #fechaDeDesmatriculacion;
    static contadorID = 1;

    /**
     * ### Constructor
     * 
     * Crea una nueva instancia de la clase `estudiante`.
     * 
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Instancia de la clase `Direccion` que representa la dirección del estudiante.
     * @param {Object} [listaModulos={}] - Lista inicial de módulos (opcional).
     */
    constructor(nombre, edad, direccion, listaModulos = {}) {
        super(nombre);

        this.#id = estudiante.contadorID++; // Asigna el ID único y lo incrementa.
        this.#edad = edad;
        this.#direccion = direccion;
        this.#listaModulos = new listaAsignaturas();
        this.#fechaDeMatriculacion = null; // Inicialmente no matriculado.
        this.#fechaDeDesmatriculacion = null; // Inicialmente no desmatriculado.
    }

    /** @returns {number} ID único del estudiante. */
    get id() {
        return this.#id;
    }

    /** @param {number} value - Nuevo ID del estudiante. */
    set id(value) {
        this.#id = value;
    }

    /** @returns {number} Edad del estudiante. */
    get edad() {
        return this.#edad;
    }

    /** @param {number} value - Nueva edad del estudiante. */
    set edad(value) {
        this.#edad = value;
    }

    /** @returns {Direccion} Dirección del estudiante. */
    get direccion() {
        return this.#direccion;
    }

    /** @param {Direccion} value - Nueva dirección del estudiante. */
    set direccion(value) {
        this.#direccion = value;
    }

    /** @returns {listaAsignaturas} Lista de asignaturas del estudiante. */
    get listaModulos() {
        return this.#listaModulos;
    }

    /** @param {listaAsignaturas} value - Nueva lista de asignaturas. */
    set listaModulos(value) {
        this.#listaModulos = value;
    }

    /** @returns {Date|null} Fecha de matriculación del estudiante. */
    get fechaDeMatriculacion() {
        return this.#fechaDeMatriculacion;
    }

    /** @param {Date} value - Nueva fecha de matriculación. */
    set fechaDeMatriculacion(value) {
        this.#fechaDeMatriculacion = value;
    }

    /** @returns {Date|null} Fecha de desmatriculación del estudiante. */
    get fechaDeDesmatriculacion() {
        return this.#fechaDeDesmatriculacion;
    }

    /** @param {Date} value - Nueva fecha de desmatriculación. */
    set fechaDeDesmatriculacion(value) {
        this.#fechaDeDesmatriculacion = value;
    }

    /**
     * Matricula al estudiante en una nueva asignatura.
     * 
     * @param {Asignatura} Asignatura - La asignatura en la que se matriculará el estudiante.
     */
    matricularAsignatura(Asignatura) {
        this.#listaModulos.agregarAsignatura(Asignatura);
    }

    /**
     * Desmatricula al estudiante de una asignatura.
     * 
     * @param {string} nombre - Nombre de la asignatura que se desea eliminar.
     */
    desmatricularAsignatura(nombre) {
        this.#listaModulos.eliminarAsignatura(nombre);
    }

    /**
     * Calcula el promedio general de todas las asignaturas del estudiante.
     * 
     * @returns {number} Promedio general redondeado a dos decimales.
     */
    calcularPromedio() {
        let mediaTotal = 0;
        this.#listaModulos.lista.forEach(element => {
            mediaTotal += parseFloat(element.promedio().toFixed(2));
        });

        return mediaTotal / this.#listaModulos.lista.length;
    }

    /**
     * Añade una calificación a una asignatura específica.
     * 
     * @param {string} nombre - Nombre de la asignatura.
     * @param {number} nota - Calificación a añadir (debe estar entre 0 y 10).
     * 
     * @throws {Error} Si la nota no es válida.
     */
    aniadirCalificaciones(nombre, nota) {
        if (typeof nota === 'number' && nota >= 0 && nota <= 10) {
            this.#listaModulos.lista.forEach(asignatura => {
                if (asignatura.nombre === nombre) {
                    asignatura.aniadirCalifiaciones(nota);
                }
            });
        } else {
            throw new Error("La nota debe ser un número entre 0 y 10.");
        }
    }

    /**
     * Busca asignaturas cuyo nombre contenga un patrón específico.
     * 
     * @param {string} patron - Patrón de búsqueda.
     * 
     * @returns {string} Lista de nombres de asignaturas que coinciden con el patrón.
     * 
     * @throws {Error} Si el patrón no es una cadena.
     */
    buscarAsignaturaPorNombre(patron) {
        if (typeof patron !== "string") {
            throw new Error("El patrón debe ser una cadena de texto.");
        }

        const regex = new RegExp(patron, "i");

        return this.#listaModulos.lista
            .filter(asignatura => regex.test(asignatura.nombre))
            .map(asignatura => asignatura.nombre)
            .join('\n');
    }

    /**
     * Devuelve una representación en cadena de los datos principales del estudiante.
     * 
     * @returns {string} Información del estudiante.
     */
    toString() {
        return `ID: ${this.#id}, Nombre: ${super.nombre}, Edad: ${this.#edad}, Dirección: ${this.#direccion.toString()}`;
    }

    /**
     * Convierte el objeto a un formato serializable.
     * 
     * @returns {Object} Objeto plano con los datos del estudiante.
     */
    toJSON() {
        return {
            nombre: super.nombre,
            edad: this.#edad,
            direccion: this.#direccion.toJSON(), // Asegúrate de que Direccion también tenga toJSON()
            id: this.#id,
            fechaDeMatriculacion: this.#fechaDeMatriculacion,
            fechaDeDesmatriculacion: this.#fechaDeDesmatriculacion,
            listaModulos: this.#listaModulos.toJSON(), // Asegúrate de que listaAsignaturas también tenga toJSON()
        };
    }

    /**
     * Reconstruye el objeto desde un formato plano.
     * 
     * @param {Object} datos - Objeto plano con los datos del estudiante.
     * @returns {estudiante} Instancia de la clase `estudiante`.
     */
    static fromJSON(datos) {
        const nuevoEstudiante = new estudiante(
            datos.nombre,
            datos.edad,
            Direccion.fromJSON(datos.direccion) // Asegúrate de que Direccion tenga fromJSON()
        );
        nuevoEstudiante.#id = datos.id;
        nuevoEstudiante.#fechaDeMatriculacion = datos.fechaDeMatriculacion;
        nuevoEstudiante.#fechaDeDesmatriculacion = datos.fechaDeDesmatriculacion;
        nuevoEstudiante.#listaModulos = listaAsignaturas.fromJSON(datos.listaModulos); // Asegúrate de que listaAsignaturas tenga fromJSON()
        return nuevoEstudiante;
    }
}