
/**
 * ## Clase Nombre
 * 
 * Representa un nombre con validación personalizada. Diseñada para su reutilización en herencia, como en clases `Asignatura` y `Estudiante`.
 * 
 * ### Validación:
 * - El nombre debe contener solo **letras** y **espacios**.
 * - Si el nombre no cumple con la validación, se lanza un error.
 * 
 * ### Uso en herencia:
 * Esta clase puede ser extendida para compartir la lógica de validación de nombres en otras entidades que necesiten atributos similares.
 * 
 * ```
 */
export default class nombre {
    #nombre;

    /**
     * ### Constructor
     * 
     * Crea una instancia de la clase `nombre` con validación.
     * 
     * @param {string} nombre - El nombre a validar y asignar.
     * 
     * **Nota:** Si el nombre no cumple con la validación (letras y espacios), se lanza un error.
     * 
     */
    constructor(nombre) {
        const regex = /^[A-Za-z\s]+$/;

        if (!regex.test(nombre)) {
            throw new Error("El nombre debe contener solo letras, números romanos y espacios.");
        }
        this.#nombre = nombre;
    }

    get nombre(){
        return this.#nombre;
    }


    /**
     * Devuelve una representación en cadena del nombre.
     * @returns {string} El nombre como una cadena de texto.
     */
    toString() {
        return this.#nombre;
    }
}