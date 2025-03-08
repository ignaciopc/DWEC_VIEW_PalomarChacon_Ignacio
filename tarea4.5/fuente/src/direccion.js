/**
 * Me creo una clase Direccion la cual va a contener los siguientes atributos:
 * Calle: calle en la que vive el estudiante.
 * Numero: número en el que vive el estudiante.
 * Piso: Piso de la vivienda.
 * CodigoPostal: Código postal asociado a la dirección.
 * Provincia: Nombre de la provincia.
 * Localidad: Nombre de la localidad.
 * Métodos:
 * Tengo los getter y setter de todos los atributos ya que están privados.
 * Tengo el método toString para ver el contenido de la dirección.
 * Agregué el método toSerializableObject para serializar la dirección.
 */

/**
 * ## Clase Dirección
 * 
 * Representa una dirección postal.
 */
export default class Direccion {
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    /**
     * ### Constructor
     * 
     * Crea una instancia de la clase `Direccion`.
     * 
     * @constructor
     * @param {string} calle - La calle de la dirección.
     * @param {number} numero - El número de la dirección.
     * @param {string} piso - El piso de la dirección (si aplica).
     * @param {string} codigoPostal - El código postal de la dirección.
     * @param {string} provincia - La provincia de la dirección.
     * @param {string} localidad - La localidad de la dirección.
     */
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#codigoPostal = codigoPostal;
        this.#provincia = provincia;
        this.#localidad = localidad;
    }

    // Getters y Setters
    get calle() {
        return this.#calle;
    }

    set calle(value) {
        this.#calle = value;
    }

    get numero() {
        return this.#numero;
    }

    set numero(value) {
        this.#numero = value;
    }

    get piso() {
        return this.#piso;
    }

    set piso(value) {
        this.#piso = value;
    }

    get codigoPostal() {
        return this.#codigoPostal;
    }

    set codigoPostal(value) {
        this.#codigoPostal = value;
    }

    get provincia() {
        return this.#provincia;
    }

    set provincia(value) {
        this.#provincia = value;
    }

    get localidad() {
        return this.#localidad;
    }

    set localidad(value) {
        this.#localidad = value;
    }

    /**
     * Devuelve una representación en cadena de la dirección.
     * 
     * **Formato de salida:**
     * `Dirección: {calle} {numero}, Piso {piso}, CP: {codigoPostal}, {localidad}, {provincia}`
     * 
     * @returns {string} La dirección completa en formato de cadena.
     */
    toString() {
        return `Dirección: ${this.calle} ${this.numero}, Piso ${this.piso}, CP: ${this.codigoPostal}, ${this.localidad}, ${this.provincia}`;
    }

    toJSON() {
        return {
            calle: this.calle,
            numero: this.numero,
            piso: this.piso,
            codigoPostal: this.codigoPostal,
            provincia: this.provincia,
            localidad: this.localidad,
        };
    }

    /**
     * Reconstruye una instancia de `Direccion` desde un objeto JSON.
     * 
     * @param {Object} json - Objeto JSON con los datos de la dirección.
     * @returns {Direccion} Instancia de `Direccion`.
     */
    static fromJSON(json) {
        return new Direccion(
            json.calle,
            json.numero,
            json.piso,
            json.codigoPostal,
            json.provincia,
            json.localidad
        );
    }
}