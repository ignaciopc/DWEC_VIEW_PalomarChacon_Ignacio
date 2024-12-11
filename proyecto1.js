// Creacion de la clase direccion

/**
 * Me creao una clase direccion la cual va contener los siguientes atributos :
 * Calle : calle en la que vive el estudiante
 * Numero : numero en el que vive el estudiatne
 * Piso : Piso de la vivienda 
 * CodigoPostal : Código postal asociado a la dirección.
 * Provincia : Nombre de la provincia 
 * Localidad : Nombre de la localidadc
 * Metodos : 
 * Tengo los getter y setter de todos los atributos ya que estan privados
 * Tengo el metodo toString para ver el contenido de la direccion 
 */
class direccion {
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#codigoPostal = codigoPostal;
        this.#provincia = provincia;
        this.#localidad = localidad;
    }
    // Getters y Setters para calle
    get calle() {
        return this.#calle;
    }
    set calle(value) {
        this.#calle = value;
    }

    // Getters y Setters para numero
    get numero() {
        return this.#numero;
    }
    set numero(value) {
        this.#numero = value;
    }

    // Getters y Setters para piso
    get piso() {
        return this.#piso;
    }
    set piso(value) {
        this.#piso = value;
    }

    // Getters y Setters para codigoPostal
    get codigoPostal() {
        return this.#codigoPostal;
    }
    set codigoPostal(value) {
        this.#codigoPostal = value;
    }

    // Getters y Setters para provincia
    get provincia() {
        return this.#provincia;
    }
    set provincia(value) {
        this.#provincia = value;
    }

    // Getters y Setters para localidad
    get localidad() {
        return this.#localidad;
    }
    set localidad(value) {
        this.#localidad = value;
    }


    toString() {
        return `Dirección: ${this.calle} ${this.numero}, Piso ${this.piso}, CP: ${this.codigoPostal}, ${this.localidad}, ${this.provincia}`;
    }
}

// Creacion de la clase nombre con un atributo nombre y con validacion para la implementacion de herencia ya que en la clase asignatura y estudiante se usa el mismo tipo de validacion
// Constructor que valida que el nombre solo contenga letras y espacios.
// Si el nombre no es válido, lanza un error.
class nombre {
    #nombre;
    constructor(nombre) {
        const regex = /^[A-Za-z\s]+$/;

        if (!regex.test(nombre)) {
            throw new Error("El nombre debe contener solo letras, números romanos y espacios.");
        }
        this.#nombre = nombre;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(value) {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(value)) {
            throw new Error("El nombre debe contener solo letras, números romanos y espacios.");
        }
        this.#nombre = value;
    }

    toString() {
        return this.#nombre;
    }
}

// Creacion de la clase asignatura
/**
 *  Atributos : Tiene un array lleno de calificaciones(notas de cada asignatura) y tiene el atributo del padre que es nombre
 * Metodos :
 * Promedio : se calcula la nota media que ha sacado en esta asignatura
 * AniadirCalificaciones : Luego de hacer una comprobacion de que sea un número y esté dentro del rango 0-10.
 *  Si no ha salido ningun tipo de error se le añadira una calaficacion o nota a la asignatura
 * toString : Sirve para ver que datos tiene la clase asignatura
 * 
 */
class Asignatura extends nombre {
    #calificaciones = [];

    constructor(nombre, ...calificaciones) {
        super(nombre)

        this.#calificaciones = calificaciones; // Inicializar array de calificaciones
    }

    // Getters y Setters para acceder y modificar los atributos privados


    get calificaciones() {
        return this.#calificaciones;
    }

    set calificaciones(value) {
        this.#calificaciones = value;
    }
    // Calcula el promedio de todas las calificaciones de la asignatura.
    // Itera sobre todas las calificaciones y calcula la media.
    promedio() {
        let media = 0;

        this.#calificaciones.forEach(element => {
            media += element;
        });
        return media / this.#calificaciones.length;
    }
    // Añade una calificación a la lista de calificaciones de la asignatura.
    // Valida que la calificación 

    aniadirCalifiaciones(nota) {
        if (typeof nota === "number" && nota != null) {
            this.#calificaciones.push(nota);
        } else {
            throw new Error("La nota debe de ser un numero y debe estar entre 0 y 10");

        }
    }



    toString() {
        let cadena = '';

        cadena += super.nombre + ' ';

        this.#calificaciones.forEach(element => {
            cadena += element + ' ';
        });
        return cadena
    }
}

// Creacion de la clase asignaturas
/**
 * La clase lista asignatura contendra un array con cada asignatura que tenga el estudiante 
 * Atributos : Un array con las asignaturas
 * Metodos : 
 * Getter y Setter del atributo asignatura
 * eliminarAsignatura : luego de comprobar que se le ha pasado un string y no otra cosa se eliminan las asignaturas que tengan ese nombre
 * agregarAsignatura : Se comprueba que sea de clase asignatura y luego se comprueba si esa asignatura no esta en mi lista, si no esta se añade
 * toString : para ver que valores tienen los atributos
 */
class listaAsignaturas {

    #lista = [];
    constructor(...lista) {
        this.#lista = lista;
    }

    // Getter para lista
    get lista() {
        return this.#lista;
    }

    // Setter para lista
    set lista(value) {
        if (!Array.isArray(value)) {
            throw new Error("El valor asignado a lista debe ser un array.");
        }
        this.#lista = value;
    }

    eliminarAsignatura(nombre) {
        if (typeof nombre != "string") {
            throw new Error("Error se debe de pasar una cadena de texto con el nombre de la asignatura");
        }

        this.#lista = this.#lista.filter(element => element.nombre !== nombre);
    }

    agregarAsignatura(asignature) {
        //COMPROBAR SI ES UN OBJETO DE TIPO ASIGNATURA

        if (!(asignature instanceof Asignatura)) {
            throw new Error("Error se debe de pasar un objeto de tipo Asignatura");
        }
        //Compruebo que no esté en mi array de asignaturas
        const existe = this.#lista.some(asignatura => asignatura.nombre === asignature.nombre);
        if (existe) {
            throw new Error(`Error: La asignatura "${asignature.nombre}" ya está en la lista.`);
        }

        // Añado al array si no ha habido ningún error
        this.#lista.push(asignature);
    }

    toString() {
        let cadena = ''
        this.#lista.forEach(element => {
            cadena += element.toString();
        });

        return cadena
    }
}

// Creacion de la clase estudiante

/**
 * La clase estudiante son los datos de un estudiante
 * Atributos :
 *  id : Es un identificador único para cada estudiante. Este atributo se asigna automáticamente utilizando un contador estático
 * edad: Representa la edad del estudiante. Es un número entero que indica cuántos años tiene el estudiante.
 * direccion : Contiene la dirección del estudiante, que es una instancia de la clase direccion
 *  listaModulos :Es una lista de las asignaturas en las que el estudiante está matriculado. Se gestiona como una instancia de la clase listaAsignaturas
 * fechaDeMatriculacion :Almacena la fecha en la que el estudiante fue matriculado en la lista de estudiantes
 * fechaDeDesmatriculacion : Almacena la fecha en la que el estudiante fue eliminado o desmatriculado de la lista de estudiantes.
 * 
 * Metodos :
 * getter y setter para cada uno de los atributos
 * matricula asignatura : // Llama a la función agregarAsignatura de la clase listaAsignaturas.
 * calcularPromedio : // Se utiliza el promedio de cada asignatura para obtener la media general.
 * aniadirCalificaciones : Luego de hacer unas comprobaciones si no salta ningun tipo de error se añadira una califiacion a la asignatura que le has pasado 
 * buscarAsignaturaPorNombre : Se buscan todas las asignaturas que cotienen el nombre que se le ha pasado
 * toString : para ver los datos del estudiante
 */
class estudiante extends nombre {
    #id;
    #edad;
    #direccion;
    #listaModulos;
    #fechaDeMatriculacion;
    #fechaDeDesmatriculacion;
    static contadorID = 1;


    constructor(nombre, edad, direccion, listaModulos = {}) {
        super(nombre)


        this.#id = estudiante.contadorID++;  // Asigna el id y luego incrementa el contador
        this.#edad = edad;
        this.#direccion = direccion;
        this.#listaModulos = new listaAsignaturas();
        this.#fechaDeMatriculacion = null;  // No esta matriculado hasta que se aniada a la lista de       estudiantes
        this.#fechaDeDesmatriculacion = null; // Al inicio no está desmatriculado


    }
    // Getter y Setter para id
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    // Getter y Setter para nombre


    // Getter y Setter para edad
    get edad() {
        return this.#edad;
    }

    set edad(value) {
        this.#edad = value;
    }

    // Getter y Setter para direccion
    get direccion() {
        return this.#direccion;
    }

    set direccion(value) {
        this.#direccion = value;
    }

    // Getter y Setter para listaModulos
    get listaModulos() {
        return this.#listaModulos;
    }

    set listaModulos(value) {
        this.#listaModulos = value;
    }
    get fechaDeMatriculacion() {
        return this.#fechaDeMatriculacion;
    }

    // Setter para fechaDeMatriculacion
    set fechaDeMatriculacion(value) {
        this.#fechaDeMatriculacion = value;
    }

    get fechaDeDesmatriculacion() {
        return this.#fechaDeDesmatriculacion;
    }

    // Setter para fechaDeDesmatriculacion
    set fechaDeDesmatriculacion(value) {
        this.#fechaDeDesmatriculacion = value;
    }

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

        return mediaTotal = mediaTotal / this.#listaModulos.lista.length;

    }

    aniadirCalificaciones(nombre, nota) {
        if (typeof nota == 'number' || nota >= 0 || nota <= 10) {

            this.#listaModulos.lista.forEach(asignatu => {
                if (asignatu.nombre == nombre) {
                    asignatu.aniadirCalifiaciones(nota);
                }
            });
        } else {
            throw new Error("La nota debe de ser tipo numero y ser mayor o igual que 0 y menor o igual que 10");

        }

    }

    buscarAsignaturaPorNombre(patron) {
        // Validar que el patrón sea una cadena
        if (typeof patron !== "string") {
            throw new Error("El patrón debe ser una cadena de texto");
        }

        // Crear una expresión regular para realizar la búsqueda, haciendo la búsqueda insensible a mayúsculas/minúsculas
        const regex = new RegExp(patron, "i");

        // Filtrar las asignaturas que contienen el patrón
        let l = this.#listaModulos.lista.filter(asignatura => regex.test(asignatura.nombre));

        let asignaturas = '';
        l.forEach(element => {
            asignaturas += element.nombre + '\n';  // Asegúrate de usar '\n' para separar cada asignatura
        });
        return asignaturas;  // Aquí deberías devolver un string con los nombres concatenados de las asignaturas
    }


    toString() {
        return `ID: ${this.#id}, Nombre: ${super.nombre}, Edad: ${this.#edad}, Dirección: ${this.#direccion.toString()}`;
    }

}


/**
 * Creacion de la clase lista Estudiantes
 * Es una clase que contendra distintos tipos de alumnos de la clase alumnos
 * Atributos :
 * alumnos : Es una array que contiene a diferentes alumnos
 * Metodos : 
 * getter y setter de alumnos
 * agregarAlumnos : Luego de comprobar que no esta ya en la lista se añade un alumno
 * eliminarAlumno : Elimino el alumno que me han pasado
 * desmatricularaAsignatura : Se busca al estudiante con el mismo id del estudiante al que quieres quitarle una asignatura y cuando lo encuentra le desmatricula de esa asignatura
 * matricularAsignatura : Busca a la persona y si la encuentra la matricula de esa una asignatura
 * reporte : Muestra los datos de los alumnos poniendo su nombre, id luego las asignaturas que tiene con con sus notas y su media
 * buscarEstudiantePorNombre : Busca los estudiantes que coincidan con el nombre que le hayan pasado
 * aniadirCalifiacion:  Le añade una calificacion o nota a un estudiante en una asignatura
 * calcularPromedioAlumnoExacto : calcula el promedio de  todas las asignatura
 * buscarAsignaturasPorNombre : busca las asignaturas que coincidan con el nombre que se le ha pasado
 * toString : para ver los datos de todos lo estudiantes que hay en la lista
 * 
 */

class listaEstudiantes {
    #alumnos
    constructor() {
        this.#alumnos = [];
    }

    get alumnos() {
        return this.#alumnos;
    }

    agregarAlumnos(alumno) {
        this.#alumnos.forEach(alumn => {
            if (alumn.id == alumno.id) {
                throw new Error("El aumno que intentas meter ya esta en la lista");
            }
        });
        this.#alumnos.push(alumno);
        let hoy = new Date();
        alumno.fechaDeMatriculacion = hoy.toLocaleDateString("es-ES");

    }

    eliminarAlumnos(nombre) {

        this.#alumnos.forEach(alumn => {
            if (alumn.nombre == nombre) {
                let hoy = new Date();
                alumn.fechaDeDesmatriculacion = hoy.toLocaleDateString("es-ES");

            }

        });

        this.#alumnos = this.#alumnos.filter(element => element.nombre !== nombre);

    }

    desmatricularaAsignatura(id, nombre) {
        this.#alumnos.forEach(alum => {
            if (alum.id == id) {
                alum.desmatricularAsignatura(nombre);
            }
        });
    }

    matricularAsignatura(id, nombre) {
        this.#alumnos.forEach(alum => {
            if (alum.id == id) {
                alum.matricularAsignatura(nombre);
            }
        });
    }

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

    buscarEstudiantePorNombre(patron) {
        // Validar que el patrón sea una cadena
        if (typeof patron !== "string") {
            throw new Error("El patrón debe ser una cadena de texto");
        }

        // Crear una expresión regular para realizar la búsqueda, haciendo la búsqueda insensible a mayúsculas/minúsculas
        const regex = new RegExp(patron.toLowerCase(), "i");

        // Filtrar las asignaturas que contienen el patrón
        let l = this.#alumnos.filter(alumn => regex.test(alumn.nombre.toLowerCase()));

        let alumnos = '';
        l.forEach(element => {
            alumnos += element.nombre + '\n';  // Asegúrate de usar '\n' para separar cada asignatura
        });
        return alumnos;  // Aquí deberías devolver un string con los nombres concatenados de las asignaturas
    }

    aniadirCalifiacion(nombre, asignatura, nota) {

        this.#alumnos.forEach(alum => {
            if (alum.nombre == nombre) {
                alum.aniadirCalificaciones(asignatura, parseInt(nota));
            }
        });
    }

    calcularPromedioAlumnoExacto(nombre) {
        const estudiante = this.#alumnos.find(alum => alum.nombre === nombre);
        if (estudiante) {
            return estudiante.calcularPromedio();
        } else {
            throw new Error("Estudiante no encontrado.");
        }
    }

    buscarAsignaturasPorNombre(patron) {
        let cadena = '';
        this.#alumnos.forEach(estudiante => {
            cadena += estudiante.buscarAsignaturaPorNombre(patron);
        });

        return cadena;
    }

    calcularPromedioClase(){
        let media  = 0;
        let contador =0;
        this.#alumnos.forEach(alumn => {
            if(!isNaN(alumn.calcularPromedio())){
            media += alumn.calcularPromedio();
            contador++;
        }
        });
        return (media/contador).toFixed(2);
    }

    toString() {
        this.#alumnos.forEach(alumn => {
            console.log(alumn.toString())
        });
    }
}

// Creacion de una lista de Asignaturas y de una lista de estudiantes
let listaDeAsignaturas = new listaAsignaturas();
let lista = new listaEstudiantes();

// Añado valores pora que vengan rellenos por defecto
function generarListados() {
    const miOtraDireccion = new direccion("Avenida Siempre Viva", 456, 2, 28090, "Madrid", "Madrid");
    const miDireccion = new direccion("Calle Falsa", 123, 1, 28080, "Madrid", "Madrid");
    const estudiante1 = new estudiante(
        "Juan Perez", // Nombre
        20, // Edad
        miDireccion // Dirección
    );
    const estudiante2 = new estudiante(
        "Maria Lopez", // Nombre
        22, // Edad
        miOtraDireccion // Dirección
    );
    const estudiante3 = new estudiante(
        "Juanjo Perez", // Nombre
        20, // Edad
        miDireccion // Dirección
    );

    const asignatura1 = new Asignatura("Matematicas", 8, 9, 10);
    const asignatura2 = new Asignatura("Historia", 7, 6, 9);
    const asignatura3 = new Asignatura("fashistoria", 7, 6, 9);

    listaDeAsignaturas.agregarAsignatura(asignatura1)
    listaDeAsignaturas.agregarAsignatura(asignatura2)
    listaDeAsignaturas.agregarAsignatura(asignatura3)


    estudiante1.matricularAsignatura(asignatura1);
    estudiante2.matricularAsignatura(asignatura1);
    estudiante3.matricularAsignatura(asignatura1);
    estudiante1.matricularAsignatura(asignatura2);

    lista.agregarAlumnos(estudiante1);
    lista.agregarAlumnos(estudiante2);
    lista.agregarAlumnos(estudiante3);

}

generarListados();


// Menu de interaccion con el usuario con las diferentes opciones
function interaccionUsuarioEstudiante() {

    let salida = false;
    do {

        console.log('Que quieres hacer')
        console.log('1 Agregar Estudiante')
        console.log('2 Eliminar Estudiante')
        console.log('3 Matricular estudiante en una asignatura')
        console.log('4 Desmatricular estudiante en una asignatura')
        console.log('5 Añadir califiacion a una asignatura')
        console.log('6 Calcular promedio de un estudiante')
        console.log('7 Buscar asignaturas que tiene los estudiantes')
        console.log('8 Mostrar estudiantes')
        console.log('9 buscar estudiantes')
        console.log('10 Promedio de la clase')
        console.log('11 Salir')
        let opcion = prompt('Que quieres hacer')
        switch (opcion) {
            case '1':
                agregarEstudiante();
                break;
            case '2':
                eliminarEstudiante()
                break;
            case '3':
                matricularEstudiante()
                break;
            case '4':
                desMatricularEstudiante()
                break;
            case '5':
                aniadirCalifiaciones()
                break;
            case '6':
                calcularPromedio()
                break;
            case '7':
                buscarAsignaturas();
                break;
            case '8':
                mostrarEstudiantes()
                break;
            case '9':
                buscarEstudiante();
                break;
            case '10':
                promedioGeneral();
                break;
            default:
                salida = true;
                break;
        }

    } while (!salida);

};

// Menu que sale si le das a la opcion de agregar Estudiante
function agregarEstudiante() {
    console.clear();
    let nombre = prompt('Dame el nombre')
    let edad = prompt('Dame la edad')
    let calle = prompt("Por favor, introduce el nombre de la calle:");
    let numero = prompt("Por favor, introduce el número de la calle:");
    let piso = prompt("Por favor, introduce el número de piso (deja vacío si no aplica):");
    let codigoPostal = prompt("Por favor, introduce el código postal:");
    let provincia = prompt("Por favor, introduce el nombre de la provincia:");
    let localidad = prompt("Por favor, introduce el nombre de la localidad:");
    direc = new direccion(calle, numero, piso, codigoPostal, provincia, localidad);
    alumn = new estudiante(nombre, edad, direc);
    lista.agregarAlumnos(alumn)

}
// Menu que sale si le das a la opcion de eliminar Estudiante

function eliminarEstudiante() {
    console.clear();

    let nombre = prompt('Dame el nombre del alumno que quieres quitar de la lista')
    lista.eliminarAlumnos(nombre)
}

// Muestras a todos los estudiantes que hay 

function mostrarEstudiantes() {

    console.log(lista.reporte());

}
// Menu que sale si le das a la opcion de matricular Estudiante

function matricularEstudiante() {
    console.clear();

    let nombreEstudiante = prompt("Ingresa el nombre del estudiante nombre: ")
    let nombreAsigntura = prompt("Ingresa el nombre de la asignatura nombre: ")
    let cantidad_calificaciones = parseInt(prompt("¿Cuántas calificaciones deseas ingresar? "))
    let calificaciones = [];
    let asignatura1 = new Asignatura();

    // Pedir las calificaciones
    for (let i = 0; i < cantidad_calificaciones; i++) {
        let calificacion = parseInt(prompt(`Ingresa la calificación ${i + 1}: `));
        if (calificacion > 10 || calificacion < 0) {
            throw new Error("El numero debe de estar entre 0 y 10");
        }
        if (i == 0) {
            asignatura1 = new Asignatura(nombreAsigntura, parseFloat(calificacion));
        } else {
            asignatura1.aniadirCalifiaciones(parseFloat(calificacion));
        }
    }


    lista.matricularAsignatura(nombreEstudiante, asignatura1);




}
// Menu que sale si le das a la opcion de desmatricular Estudiante

function desMatricularEstudiante() {
    console.clear();

    let id = prompt('Dame el id del estudiante que quieres desmatricular');

    let nombre = prompt('Dame el nombre de la asignatura de la que le quieres quitar')

    lista.desmatricularaAsignatura(id, nombre)
}
// Menu que sale si le das a la opcion de añadir califiacion 

function aniadirCalifiaciones() {
    console.clear();

    let nombreAlumno = prompt('Dame el nombre del estudiante al que quieres añadir una califiacion');

    let nombreAsigntura = prompt('Dame el nombre de la asignatura a la que quieres añadir una calificacion')

    let nota = prompt('Dame la nota a la que quieres añadir una calificacion')

    lista.aniadirCalifiacion(nombreAlumno, nombreAsigntura, nota);

}
// Menu que sale si le das a la opcion de calcular Promedio

function calcularPromedio() {
    let nombreAlumno = prompt('Dame el nombre del estudiante al que quieres calcular el promedio');

    console.log(lista.calcularPromedioAlumnoExacto(nombreAlumno));


}
// Menu que sale si le das a la opcion de buscar Asignatura

function buscarAsignaturas() {
    let nombreAsigntura = prompt('Dame las asignatura que quieres ver');

    console.log('Asignaturas\n'+lista.buscarAsignaturasPorNombre(nombreAsigntura));

}

function buscarEstudiante(){
    let nombreAlumno = prompt('Dame el nombre del estudiante');

    console.log('Estudiantes \n'+lista.buscarEstudiantePorNombre(nombreAlumno));

}

function promedioGeneral(){
    console.log(lista.calcularPromedioClase())
}

function pruebas() {
    // 1. Agregar Estudiante
    console.log('Prueba - Agregar Estudiante');
    let direc = new direccion("Calle Falsa", "123", "1", "28080", "Madrid", "Madrid");
    let alumn = new estudiante("Paqui", 20, direc);
    lista.agregarAlumnos(alumn);
    console.log('Estudiante "Paqui" agregado correctamente.');

    // 2. Eliminar Estudiante
    console.log('Prueba - Eliminar Estudiante');
    lista.eliminarAlumnos('Paqui');
    console.log('Estudiante "Paqui" eliminado correctamente.');

    // 3. Matricular Estudiante en una asignatura
    console.log('Prueba - Matricular Estudiante en una asignatura');
    let asignatura1 = new Asignatura("Lengua", 8, 9, 10);
    lista.matricularAsignatura("Juan Perez", asignatura1);
    console.log('Estudiante "Juan Perez" matriculado en "Matemáticas" correctamente.');

    // 4. Desmatricular Estudiante en una asignatura
    console.log('Prueba - Desmatricular Estudiante en una asignatura');
    lista.desmatricularaAsignatura(1, "Lengua");
    console.log('Estudiante desmatriculado de "Lengua" correctamente.');

    // 5. Añadir calificación a una asignatura
    console.log('Prueba - Añadir calificación a una asignatura');
    lista.aniadirCalifiacion("Juan Perez", "Matematicas", 9);
    console.log('Calificación añadida correctamente a "Matemáticas" para "Juan Perez".');

    // 6. Calcular Promedio de un Estudiante
    console.log('Prueba - Calcular Promedio de un Estudiante');
    let promedio = lista.calcularPromedioAlumnoExacto("Juan Perez");
    console.log('Promedio de "Juan Perez": ' + promedio.toFixed(2));

    // 7. Buscar asignaturas que tienen los estudiantes
    console.log('Prueba - Buscar asignaturas que tienen los estudiantes');
    let asignaturasEncontradas = lista.buscarAsignaturasPorNombre("Matematicas");
    console.log('Asignaturas encontradas:\n' + asignaturasEncontradas);

    // 8. Mostrar estudiantes
    console.log('Prueba - Mostrar estudiantes');
    console.log(lista.reporte());
    console.log('Estudiantes mostrados correctamente.');

    // 9 Buscar estudiante
    console.log('Prueba - Buscar estudiantes');
    console.log(lista.buscarEstudiantePorNombre());
    console.log('Estudiantes mostrados correctamente.');

    // 10 Calcular promedio general
    console.log('Prueba - Calcular promedio general');
    console.log(lista.calcularPromedioClase())

}

pruebas();
// Aqui manejo los errores enviandolos con un alert para que se vean mejor y para que el codigo no deje de funcionar
try {
    interaccionUsuarioEstudiante();

} catch (error) {
    alert(error.message)
    interaccionUsuarioEstudiante();

} 
