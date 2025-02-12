import Direccion from "./direccion.js";
import nombre from "./nombre.js";
import Asignatura from "./asignatura.js";
import estudiante from "./estudiante.js";
import listaAsignaturas from "./listaAsignaturas.js";
import listaEstudiantes from "./listaEstudiante.js";

export let listaDeAsignaturas = new listaAsignaturas();
export let lista = new listaEstudiantes();
// Añado valores pora que vengan rellenos por defecto
export function generarListados() {
    const miOtraDireccion = new Direccion("Avenida Siempre Viva", 456, 2, 28090, "Madrid", "Madrid");
    const miDireccion = new Direccion("Calle Falsa", 123, 1, 28080, "Madrid", "Madrid");
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

    listaDeAsignaturas.agregarAsignatura(asignatura1);
    listaDeAsignaturas.agregarAsignatura(asignatura2);
    listaDeAsignaturas.agregarAsignatura(asignatura3);

    estudiante1.matricularAsignatura(asignatura1);
    estudiante2.matricularAsignatura(asignatura1);
    estudiante3.matricularAsignatura(asignatura1);
    estudiante1.matricularAsignatura(asignatura2);

    lista.agregarAlumnos(estudiante1);
    lista.agregarAlumnos(estudiante2);
    lista.agregarAlumnos(estudiante3);

}


// Menu de interaccion con el usuario con las diferentes opciones
export function interaccionUsuarioEstudiante() {

    let salida = false;
    do {
        try {
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
    } catch (error) {
        alert(error.message)

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
    direc = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
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

// Menu que sale si le das a buscar estudiante

function buscarEstudiante(){
    let nombreAlumno = prompt('Dame el nombre del estudiante');

    console.log('Estudiantes \n'+lista.buscarEstudiantePorNombre(nombreAlumno));

}
// Escribe por pantalla cuando le das a la opcion de promedio general

function promedioGeneral(){
    console.log("Promedio de la clase "+lista.calcularPromedioClase())
}

export function pruebas() {
    // 1. Agregar Estudiante
    console.log('Prueba - Agregar Estudiante');
    let direc = new Direccion("Calle Falsa", "123", "1", "28080", "Madrid", "Madrid");
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
    console.log(lista.buscarEstudiantePorNombre("Jua"));
    console.log('Estudiantes mostrados correctamente.');

    // 10 Calcular promedio general
    console.log('Prueba - Calcular promedio general');
    console.log(lista.calcularPromedioClase())

}