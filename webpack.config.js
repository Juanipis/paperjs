const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./js/script.js", // Asegúrate que este es el punto correcto de entrada
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Public path para Vercel
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // Asegúrate de instalar postcss-loader si lo necesitas
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Usando el index.html en la raíz como plantilla
      filename: "index.html", // Nombre del archivo en la salida
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Nombre del archivo CSS en la salida
    }),
  ],
  mode: "production",
};
