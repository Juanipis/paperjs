const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./js/script.js", // Cambiado de ./index.js a ./js/script.js
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/paperjs/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // Agregado postcss-loader para TailwindCSS
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
      template: "./index.html", // Usar index.html en la raíz como plantilla
      filename: "index.html", // Nombre del archivo en la salida
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Nombre del archivo CSS en la salida
    }),
  ],
  mode: "production",
};
