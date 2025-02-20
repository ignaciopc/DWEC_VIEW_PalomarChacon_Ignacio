Generación Automática de Documentación con JSDoc y Minami

Este proyecto usa JSDoc con la plantilla Minami para generar documentación automáticamente. También se ha configurado un sistema de automatización con nodemon.

1. Instalación de Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
npm install

Esto instalará:
- jsdoc: Para generar la documentación.
- minami: Plantilla para una mejor visualización.
- nodemon: Para regenerar la documentación automáticamente al detectar cambios en los archivos.
Si aún no tienes Minami instalado, puedes instalarlo con:
npm install --save-dev minami

2. Configuración de JSDoc
Asegúrate de tener un archivo jsdoc.json en la raíz del proyecto con la siguiente configuración:
{
  "source": {
    "include": ["src"],
    "exclude": ["node_modules"],
    "includePattern": ".*\\.js$",
    "excludePattern": ".*\\.test\\.js$"
  },
  "opts": {
    "destination": "./out",
    "template": "node_modules/minami",
    "recurse": true
  },
  "plugins": ["plugins/markdown"]
}

3. Generar la documentación manualmente
Para generar la documentación manualmente, usa:
npm run docs

Este comando ejecutará:
"scripts": {
  "docs": "npx jsdoc -c jsdoc.json"
}

La documentación se generará en la carpeta out/ y se podrá abrir con cualquier navegador.

4. Automatizar la generación de documentación
Para regenerar la documentación automáticamente cuando se editen archivos .js, usa:
npm run docs:watch

Este comando está definido en package.json como:
"scripts": {
  "docs": "npx jsdoc -c jsdoc.json",
  "docs:watch": "nodemon --ext js --exec \"npm run docs\""
}

Si usas Windows y tienes problemas con nodemon, instala cross-env:
npm install --save-dev cross-env

Luego, edita el script en package.json así:
"scripts": {
  "docs:watch": "cross-env nodemon --ext js --exec \"npm run docs\""
}

Esto hará que la documentación se regenere automáticamente al modificar los archivos.

5. Organización del Código en Múltiples Archivos
Para mejorar la organización y mantenibilidad del código, he dividido las clases y funciones en diferentes archivos JavaScript. Esto permite una mejor modularidad, reutilización del código y facilita la depuración.

Estructura de Archivos
/src
│── nombre.js         # Clase base 'Nombre'
│── asignatura.js     # Clase 'Asignatura' que extiende 'Nombre'
│── estudiante.js     # Clase 'Estudiante' con atributos y métodos específicos
│── listaEstudiante.js # Gestión de múltiples estudiantes
│── funciones.js      # Funciones auxiliares y lógicas adicionales
│── proyecto1.js           # Archivo principal que importa y usa las clases

Clases
- nombre.js: Contiene la clase base Nombre, que define un atributo común.
- asignatura.js: Contiene la clase Asignatura, que extiende Nombre y maneja calificaciones.
- estudiante.js: Define la clase Estudiante, que gestiona los datos de un estudiante.
- listaEstudiante.js: Administra una lista de estudiantes y permite agregar calificaciones.

Funciones
- funciones.js: Contiene funciones auxiliares, como la interacción con el usuario y cálculos adicionales.

6. Ver la documentación
  Meterte en out y abrir el index.html