# 📘 Generación Automática de Documentación con JSDoc y Minami

Este proyecto usa **JSDoc** con la plantilla **Minami** para generar documentación automáticamente. También se ha configurado un sistema de automatización con `nodemon`.

---

## 🚀 **1. Instalación de Dependencias**

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```sh
npm install
```

Esto instalará:

- `jsdoc`: Para generar la documentación.
- `minami`: Plantilla para una mejor visualización.
- `nodemon`: Para regenerar la documentación automáticamente al detectar cambios en los archivos.

Si aún no tienes **Minami** instalado, puedes instalarlo con:

```sh
npm install --save-dev minami
```

---

## 📄 **2. Configuración de JSDoc**

Asegúrate de tener un archivo `jsdoc.json` en la raíz del proyecto con la siguiente configuración:

```json
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
```

---

## 🔄 **3. Generar la documentación manualmente**

Para generar la documentación manualmente, usa:

```sh
npm run docs
```

Este comando ejecutará:

```json
"scripts": {
  "docs": "npx jsdoc -c jsdoc.json"
}
```

La documentación se generará en la carpeta \`\` y se podrá abrir con cualquier navegador.

---

## ⚡ **4. Automatizar la generación de documentación**

Para regenerar la documentación automáticamente cuando se editen archivos `.js`, usa:

```sh
npm run docs:watch
```

Este comando está definido en `package.json` como:

```json
"scripts": {
  "docs": "npx jsdoc -c jsdoc.json",
  "docs:watch": "nodemon --ext js --exec \"npm run docs\""
}
```

Si usas **Windows** y tienes problemas con `nodemon`, instala `cross-env`:

```sh
npm install --save-dev cross-env
```

Luego, edita el script en `package.json` así:

```json
"scripts": {
  "docs:watch": "cross-env nodemon --ext js --exec \"npm run docs\""
}
```

Esto hará que la documentación se regenere automáticamente al modificar los archivos.

---

## 📂 **5. Ver la documentación**

Una vez generada la documentación, abre `out/index.html` en tu navegador:

```sh
start ./out/index.html  # Windows
open ./out/index.html    # macOS
xdg-open ./out/index.html  # Linux
```

---

## 🎯 **Conclusión**

Ahora, cada vez que edites un archivo en `src/`, `nodemon` regenerará automáticamente la documentación, manteniéndola siempre actualizada sin necesidad de correr manualmente `npm run docs`.

¡Listo! Tu documentación estará siempre al día. 🚀📖

