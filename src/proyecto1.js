import Direccion from "./direccion.js";
import nombre from "./nombre.js";
import Asignatura from "./asignatura.js";
import estudiante from "./estudiante.js";
import listaAsignaturas from "./listaAsignaturas.js";
import listaEstudiantes from "./listaEstudiante.js";

import {generarListados,interaccionUsuarioEstudiante,pruebas,listaDeAsignaturas,lista} from "./funciones.js";
// Creacion de una lista de Asignaturas y de una lista de estudiantes


generarListados();




pruebas();
// Aqui manejo los errores enviandolos con un alert para que se vean mejor y para que el codigo no deje de funcionar
    interaccionUsuarioEstudiante();