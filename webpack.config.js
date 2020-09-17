const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const DESTINATION = path.resolve( __dirname, 'dist' );

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: DESTINATION,
    publicPath: "/dist/",
    libraryTarget: "umd"
  },
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[folder]/[name].[ext]',
          }
        }]
      },
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src/components")
        ],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "raw-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions:{
               includePaths: [path.resolve(__dirname, 'node_modules')]
             }
            }
          }
        ]
      }
    ]
  },
  target: "web",
  externals: ["react", "react-router-dom", "prop-types", "@fortawesome/react-fontawesome"],
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "module": "new-module",
      "only-module$": "new-module",
      "module": path.resolve(__dirname, "app/third/module.js"),
    },
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, ''),
    compress: true,
    port: 9000
  }
}
