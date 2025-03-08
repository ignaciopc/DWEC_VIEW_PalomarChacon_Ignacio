const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Importar el plugin

module.exports = {
  mode: 'production', // Modo de producción
  entry: path.resolve(__dirname, './fuente/src/script.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Nueva regla para procesar los archivos CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Usamos MiniCssExtractPlugin para extraer el CSS
          'css-loader', // Carga los archivos CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css'], // Añadimos .css a las extensiones
  },
  target: 'browserslist', // Usamos la configuración de browserslist
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './fuente/index.html'),
    }),
    new MiniCssExtractPlugin({ // Configuramos el plugin para extraer el CSS
      filename: 'styles.css',
    }),
  ],
};
