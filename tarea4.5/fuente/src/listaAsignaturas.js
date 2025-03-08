import Asignatura from "./asignatura.js";
/**
 * ## Clase listaAsignaturas
 * 
 * Representa una colección de asignaturas asociadas a un estudiante.
 * 
 * ### Atributos:
 * - `#lista`: Un array que contiene objetos de tipo `Asignatura`.
 * 
 * ### Métodos:
 * - **`eliminarAsignatura`**: Elimina una asignatura de la lista según su nombre.
 * - **`agregarAsignatura`**: Añade una nueva asignatura a la lista si no está presente.
 * - **`toString`**: Devuelve una representación en cadena de todas las asignaturas en la lista.
 * 
 */
export default class listaAsignaturas {
    #lista = [];

    /**
     * ### Constructor
     * 
     * Crea una instancia de la clase `listaAsignaturas` inicializando la lista de asignaturas.
     * 
     * @param {...Asignatura} lista - Las asignaturas iniciales de la lista.
     * 
     */
    constructor(...lista) {
        this.#lista = lista;
    }


    get lista(){
        return this.#lista;
    }

    /**
     * Elimina una asignatura de la lista según su nombre.
     * 
     * **Validación:**
     * - El parámetro debe ser una cadena de texto.
     * 
     * 
     * @param {string} nombre - El nombre de la asignatura a eliminar.
     * 
     * @throws {Error} Si el parámetro no es una cadena de texto.
     */
    eliminarAsignatura(nombre) {
        if (typeof nombre !== "string") {
            throw new Error("Error: Se debe pasar una cadena de texto con el nombre de la asignatura.");
        }

        this.#lista = this.#lista.filter(element => element.nombre !== nombre);
    }

    /**
     * Añade una asignatura a la lista.
     * 
     * **Validación:**
     * - El parámetro debe ser un objeto de la clase `Asignatura`.
     * - No se permite duplicar asignaturas con el mismo nombre.
     * 
     * @param {Asignatura} asignature - La asignatura a añadir.
     * 
     * @throws {Error} Si el parámetro no es un objeto de la clase `Asignatura`.
     * @throws {Error} Si la asignatura ya está en la lista.
     */
    agregarAsignatura(asignature) {
        if (!(asignature instanceof Asignatura)) {
            throw new Error("Error: Se debe pasar un objeto de tipo Asignatura.");
        }

        const existe = this.#lista.some(asignatura => asignatura.nombre === asignature.nombre);
        if (existe) {
            throw new Error(`Error: La asignatura "${asignature.nombre}" ya está en la lista.`);
        }

        this.#lista.push(asignature);
    }

    /**
     * Devuelve una representación en cadena de todas las asignaturas en la lista.
     * 
     * 
     * @returns {string} Una cadena con los datos de todas las asignaturas.
     */
    toString() {
        let cadena = '';
        this.#lista.forEach(element => {
            cadena += element.toString();
        });

        return cadena;
    }

    toJSON() {
        return {
            lista: this.#lista.map(asignatura => asignatura.toJSON()), // Llama a toJSON de cada asignatura
        };
    }

    /**
     * Reconstruye una instancia de `listaAsignaturas` desde un objeto JSON.
     * 
     * @param {Object} json - Objeto JSON con los datos de la lista de asignaturas.
     * @returns {listaAsignaturas} Instancia de `listaAsignaturas`.
     */
    static fromJSON(json) {
        const lista = new listaAsignaturas();
        lista.#lista = json.lista.map(asignaturaData => Asignatura.fromJSON(asignaturaData));
        return lista;
    }
}