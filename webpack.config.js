const HtmlWebPackPlugin = require("html-webpack-plugin");
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
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      //   use: {
      //     loader: "file-loader",
      //   },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public/index.html"),
      favicon: path.join(__dirname, './public/favicon.ico'),
      filename: "./index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    // new webpack.DefinePlugin({
    //     // 'process.env.ASD': "KubaNKHHKJHN**8",
    //     "process.env.REACT_APP_SPREADSHEET_ID" : "1uKW5SZgF9l5eSNJ5pL4BxVv8Y4G0pIZ_vu2pwhJYTmQ",
    //     "process.env.REACT_APP_SHEET_ID" : "",
    //     "process.env.REACT_APP_GOOGLE_CLIENT_EMAIL" : "helceletka-react@helceletka-337823.iam.gserviceaccount.com",
    //     "process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY" : "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChfqWT9cEStmIR\n00w+3vuBmHb+fXgK5jJ5pvN4a+QIip2l42qoek2UkmPtViW11PmCU/MxnN8cVkIB\nEHwedKA7iD18UnYvm0+Lqyubr9gjUIu2XIoVb1e6/V/+UNA5keR/aFWwHrvILpxl\ngTOOIZDlPca+bHO8/2RWvlJ9B1u0UAarb73hEdvgT2gEF5iSFdLNUhleAGnbX3Zh\nwl3cj9RDvJ28kDH/PIwt0/eXN8hq4hVnKuriS3tAum1lx/cwIxDqoiExjt0RDUmP\n9gwQKAsP/uHTtC939WTjks9ftDWxweifVSyYYZyS/lvWl24J197hD+OeRqXX/Ni/\nOJ768/kzAgMBAAECggEAGLLM0fco4xq/nuhI5eimYGiX8k3wGQKhv5c37zfY9TF1\n8NP6EPA7gzhsTfT56Xg7/KGoNPM/8A6FI7KIuQOvKcupU6Us7BT9smeoULQxAx2j\ncG1wtNyFd1Se5L8pSVS1tIKZcEkTAQeX5bI/10Hs7hJnneHqRYJtrxKGfRauAMJq\nLK76oder1Pk3oY3WA11JyM6ldT+IRKb53U0uJoh6g6DT/9QA25b1W69uWUYB4nJm\nvgMNC6gAU+fYKr0Fn1Uh5lsbt5Y2U5FGY6VZfx3XxC3tKQA/VfzHi+5bYUPWaHpO\n1/41SbkWTUf5j0UTPF+KsI0dmTbYxuaAhI8vH7vwIQKBgQDV5J5sqMRvaqtiiK79\nn0N0rAmK0J7rOPHbhKjLKfpw0rptZSqEq4+2VV/hCZ8fMwnD0wnxjUG5fXRpZexC\nN1I/YkgZVuLPbMEpilBkj6MkXJPA8RiZJhqKV2KiTVdwauj/xnMFjJECFp1X2cN5\nIvv8+X5R3qGcCapyaRxBtZON4wKBgQDBSVrmYqrpuRGAV2IuD5/k9bl+VhWSp3Qa\n0Xo8Mlmyg7ItdsmNJ7+2LveS2CruhofBuD/aE8DjWhcYMAy8pprK9L+hxglbkuNu\nvgKyjKsJid7l9p8nhApfUYW7N+2ShKoVj++upXysnFl8Jyi9nnsNzr9caPjJzlcd\nPFjnu3PIcQKBgFUrY6oAybdT0kq6AnQbJtEeb+5GhAFF+4hdmpjLbl3eiz1kOzn4\n1pDUDgmduy7BM/I15o+4n6MswV32p8z2GloC2JK+djICLChOWxSv3VZtRqhdWF4j\nPg44HZ5jDZ5F8+FlNAfRoSwjtSN2Is/pjk19Sz9uVwu7DZPhJs9Dbi3hAoGAR4LT\nTb+dimF9VyV9XptLRhOfsF07GAo6S53LArCCPSi6aFW1ljLpnAbedAbkQ2Gkooh/\nnziFudfgCYPlgnqFdKd+quSxG59J4/QK3XJr6ViIDj7jfWQ9zixENRMpI3dP0jBx\ntgTmDpq+BNAcI6OZ1W7zn8X6nfdohZmJLxtMaBECgYEAljWEIT4ejq1b14WUVL9c\nLxZnQLWWi0EvOmlz9LlFzEUc4HiKic0QmIAGfKcnU6aTwzQph8bg1gexS6uwTZFF\ngwvqSQ9mP3HjzSyI1d+eJ/TPmfDoRv1pNXWhfzGfvF0fLiZ5CdoXBotR6aSVqRFm\nfeKhfqUk6IbKinwjS5eHy/4=\n-----END PRIVATE KEY-----\n",
    // }),
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