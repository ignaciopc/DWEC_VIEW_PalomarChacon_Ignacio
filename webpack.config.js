const path = require('path');

module.exports = {
  entry: './fuente/src/script.js', // Punto de entrada de tu aplicación
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'out') // Carpeta de salida
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica Babel a todos los archivos .js
        exclude: /node_modules/, // Excluye la carpeta node_modules
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: 'production' // Modo producción para optimización
};