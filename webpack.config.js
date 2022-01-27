const HtmlWebPackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "main.js",
    publicPath: "/",
  },
  target: "web",
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          // "sass-loader", //1. Turns sass into css
        ],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      //   use: {
      //     loader: "file-loader",
      //   },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      //   exclude: /node_modules/,
      //   use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      // },
      // {
      //   test: /\.(png|svg|jpg|gif|jpe?g)$/,
      //   use: [
      //     {
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "images/"
      //       },
      //       loader: "file-loader"
      //     }
      //   ]
      // }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: path.join(__dirname, "public/index.html"),
      // favicon: path.join(__dirname, './public/favicon.ico'),
      filename: "./index.html",

    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '' // can modify `static` to another name or get it from `process`
    })
  ],
  resolve: {
    fallback: {
      fs: false,
      tls: "empty",
      child_process: false,
      util: require.resolve("util/"),
      url: require.resolve("url"),
      buffer: require.resolve("buffer"),
      assert: require.resolve("assert/"),
      http: require.resolve("stream-http"),
      path: require.resolve("path-browserify"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      "crypto-browserify": require.resolve("crypto-browserify"),
      "querystring": require.resolve("querystring-es3"),
    },

  },
};