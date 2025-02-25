/* eslint-disable no-useless-escape */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    app: [
      resolve('src/js/app.js'),
      resolve('src/styles/app.sass')
    ]
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm',
      '@fortawesome/free-brands-svg-icons': '@fortawesome/free-brands-svg-icons/index.es',
      '@fortawesome/free-solid-svg-icons': '@fortawesome/free-solid-svg-icons/index.es',
      '@fortawesome/free-regular-svg-icons': '@fortawesome/free-regular-svg-icons/index.es',
      '@fortawesome/vue-fontawesome': '@fortawesome/vue-fontawesome/index.es',
      '@fortawesome/fontawesome-svg-core': '@fortawesome/fontawesome-svg-core/index.es',
      '@components': resolve('src/js/components'),
      '@utils': resolve('src/js/utils'),
      '@store': resolve('src/js/store'),
      '@router': resolve('src/js/router')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: '0.0.0.0'
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new Dotenv({
      path: resolve('.env'),
      systemvars: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
