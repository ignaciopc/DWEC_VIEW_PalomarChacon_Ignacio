const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importar el plugin

module.exports = {
  entry: './fuente/src/script.js', // Punto de entrada de la aplicación
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'out'), // Carpeta de salida
    clean: true // Limpia la carpeta 'out' antes de cada build
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica Babel a los archivos .js
        exclude: /node_modules/, // Excluye la carpeta node_modules
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/, // Aplica css-loader y style-loader a archivos CSS
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/, // Aplica html-loader a archivos HTML
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './fuente/index.html', // Archivo HTML base
      filename: 'index.html' // Nombre del archivo generado en la carpeta de salida
    })
  ],
  mode: 'production' // Modo producción para optimización
};
