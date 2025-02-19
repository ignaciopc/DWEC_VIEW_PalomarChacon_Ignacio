 import nombre from "./nombre.js";
/**
 * ## Clase Asignatura
 * 
 * Representa una asignatura que hereda de la clase `nombre`.
 * 
 * ### Atributos:
 * - `#calificaciones`: Un array de calificaciones (notas) asociadas a la asignatura.
 * - Hereda el atributo `#nombre` de la clase padre.
 * 
 * ### Métodos:
 * - **`promedio`**: Calcula la nota media de la asignatura.
 * - **`aniadirCalificaciones`**: Añade una calificación tras validar que es un número en el rango de 0 a 10.
 * - **`toString`**: Devuelve una representación en cadena de los datos de la asignatura.
 * 
 */
export default class Asignatura extends nombre {
    #calificaciones = [];

    /**
     * ### Constructor
     * 
     * Crea una instancia de la clase `Asignatura` inicializando su nombre y las calificaciones.
     * 
     * @param {string} nombre - El nombre de la asignatura (heredado de la clase `nombre`).
     * @param {...number} calificaciones - Las calificaciones iniciales de la asignatura.
     * 
     */
    constructor(nombre, ...calificaciones) {
        super(nombre);
        this.#calificaciones = calificaciones; // Inicializar array de calificaciones
    }
    
    get nombre() {
        return super.nombre; // Accede al nombre desde la clase padre
    }

    /**
     * Calcula el promedio de todas las calificaciones de la asignatura.
     * 
     * 
     * @returns {number} El promedio de las calificaciones.
     * 
     * @throws {Error} Si no hay calificaciones registradas.
     */
    promedio() {
        if (this.#calificaciones.length === 0) {
            throw new Error("No hay calificaciones para calcular el promedio.");
        }

        let suma = 0;
        this.#calificaciones.forEach(element => {
            suma += element;
        });
        return suma / this.#calificaciones.length;
    }

    /**
     * Añade una calificación a la lista de calificaciones de la asignatura.
     * 
     * **Validación:**
     * - La calificación debe ser un número entre 0 y 10.
     * 
     * 
     * @param {number} nota - La calificación a añadir.
     * 
     * @throws {Error} Si la calificación no es válida.
     */
    aniadirCalifiaciones(nota) {
        if (typeof nota === "number" && nota >= 0 && nota <= 10) {
            this.#calificaciones.push(nota);
        } else {
            throw new Error("La nota debe ser un número y debe estar entre 0 y 10.");
        }
    }

    /**
     * Devuelve una representación en cadena de los datos de la asignatura.
     * 
     * **Formato de salida:**
     * `{nombre} {calificaciones}`
     * 
     * 
     * @returns {string} Una cadena con el nombre de la asignatura y sus calificaciones.
     */
    toString() {
        let cadena = `${super.nombre} `;

        this.#calificaciones.forEach(element => {
            cadena += `${element} `;
        });
        return cadena.trim(); // Elimina espacios extra al final.
    }

     /**
     * Devuelve una representación serializable del objeto Asignatura.
     *
     * @returns {Object} Un objeto con las propiedades relevantes.
     */
     toJSON() {
        return {
            nombre: this.nombre,
            calificaciones: [...this.#calificaciones] // Copia del array de calificaciones
        };
    }

    /**
     * Reconstruye una instancia de `Asignatura` desde un objeto JSON.
     *
     * @param {Object} json - Objeto JSON con los datos de la asignatura.
     * @returns {Asignatura} Instancia de `Asignatura`.
     */
    static fromJSON(json) {
        const asignaturaInstance = new Asignatura(json.nombre, ...json.calificaciones);
        return asignaturaInstance;
    }
}