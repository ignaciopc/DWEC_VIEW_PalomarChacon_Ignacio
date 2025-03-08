import nombre from "./nombre.js";
import Direccion from "./direccion.js";
import listaAsignaturas from "./listaAsignaturas.js";

/**
 * ## Clase Estudiante
 * 
 * Representa los datos y funcionalidades relacionadas con un estudiante.
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

    // Getters y Setters
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get edad() {
        return this.#edad;
    }

    set edad(value) {
        this.#edad = value;
    }

    get direccion() {
        return this.#direccion;
    }

    set direccion(value) {
        this.#direccion = value;
    }

    get listaModulos() {
        return this.#listaModulos;
    }

    set listaModulos(value) {
        this.#listaModulos = value;
    }

    get fechaDeMatriculacion() {
        return this.#fechaDeMatriculacion;
    }

    set fechaDeMatriculacion(value) {
        this.#fechaDeMatriculacion = value;
    }

    get fechaDeDesmatriculacion() {
        return this.#fechaDeDesmatriculacion;
    }

    set fechaDeDesmatriculacion(value) {
        this.#fechaDeDesmatriculacion = value;
    }

    // Métodos existentes...
    matricularAsignatura(Asignatura) {
        this.#listaModulos.agregarAsignatura(Asignatura);
    }

    desmatricularAsignatura(nombre) {
        this.#listaModulos.eliminarAsignatura(nombre);
    }

    calcularPromedio() {
        let mediaTotal = 0;
        this.#listaModulos.lista.forEach(element => {
            mediaTotal += parseFloat(element.promedio().toFixed(2));
        });
        return mediaTotal / this.#listaModulos.lista.length;
    }

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

    toString() {
        return `ID: ${this.#id}, Nombre: ${super.nombre}, Edad: ${this.#edad}, Dirección: ${this.#direccion.toString()}`;
    }

    /**
     * Convierte el estudiante en un objeto serializable para guardar en localStorage.
     * 
     * @returns {Object} Un objeto plano con las propiedades serializables del estudiante.
     */

    toJSON() {
        return {
            id: this.#id,
            nombre: super.nombre,
            edad: this.#edad,
            direccion: this.#direccion.toJSON(),
            listaModulos: this.#listaModulos.toJSON(),
            fechaDeMatriculacion: this.#fechaDeMatriculacion,
            fechaDeDesmatriculacion: this.#fechaDeDesmatriculacion,
        };
    }

    /**
     * Reconstruye una instancia de `estudiante` desde un objeto JSON.
     * 
     * @param {Object} json - Objeto JSON con los datos del estudiante.
     * @returns {estudiante} Instancia de `estudiante`.
     */
    static fromJSON(json) {
        const estudianteInstance = new estudiante(json.nombre, json.edad, Direccion.fromJSON(json.direccion));
        estudianteInstance.#id = json.id;
        estudianteInstance.#listaModulos = listaAsignaturas.fromJSON(json.listaModulos);
        estudianteInstance.#fechaDeMatriculacion = json.fechaDeMatriculacion;
        estudianteInstance.#fechaDeDesmatriculacion = json.fechaDeDesmatriculacion;
        return estudianteInstance;
    }
 
}