const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    publicPath: "/assets/",
    libraryTarget: "umd"
  },
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/images/[folder]/[name].[ext]',
          }
        }]
      },
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src/lib")
        ],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              esModule: true,
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]',
                context: path.resolve(__dirname, 'src/lib/components')
              },
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[id].css'
    })
  ]
}
