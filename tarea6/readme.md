# Proyecto Web con TailwindCSS, Flowbite y Vite

##  Estructura de Directorios

```
src/
├── estilos/
│   ├── principal.css
│   └── salida.css
├── js/
│   ├── index.js
│   └── jquery.js
├── html/
│   └── jquery.html
└── index.html
.gitignore
package-lock.json
package.json
tailwind.config.js
vite.config.js
```

##  Características Principales

- **Encabezado**: Incluye un logotipo y un menú ficticio.
- **Cuerpo**: Muestra imágenes en formato tarjeta, cada una con una imagen, un título y un pequeño texto. Se implementa un efecto al pasar el ratón por encima de las tarjetas.
- **Pie de página**: Contiene secciones típicas como redes sociales y enlaces de interés.
- **Desplazamiento infinito (Infinite Scroll)**: Carga automáticamente más imágenes cuando el usuario llega al final de la página.

##  Herramientas Utilizadas

- **TailwindCSS**: Para el diseño y maquetación de la web.
- **Flowbite**: Para componentes externos como el encabezado y pie de página.
- **Vite**: Como empaquetador para traducir, prefijar, minimizar y empaquetar los archivos.
- **Node.js**: Para configurar el flujo de trabajo de TailwindCSS y Vite.
- **jQuery** : Para facilitar la manipulación del DOM y eventos interactivos.


##  Configuración del Proyecto

### 1️ Instalar Dependencias

```sh
npm install
```

### 2️ Iniciar el Servidor de Desarrollo

```sh
npm run dev
```

Esto te llevará directamente al navegador donde podrás ver la página en tiempo real. 

