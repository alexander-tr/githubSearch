const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebapckPlugin = require('terser-webpack-plugin')
const MiniCSS = require('mini-css-extract-plugin')
const path = require('path')
require('dotenv').config()

module.exports = {
  mode : 'production',
  entry : {
    app : path.resolve(__dirname,'src/index.js'),       
  },
  output : {
    path : path.resolve(__dirname,'dist'),
    filename : 'js/app.js',
    publicPath : '/'
  },
  optimization : {
    minimizer : [new TerserWebapckPlugin()]
  },
  module : {
    rules : [
      {
        test : /js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader'
        }
      },
      {
        test : /css$/,
        use : [{
          loader :  MiniCSS.loader
        },'css-loader']
      }
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env.CLIENT_SECRET' : JSON.stringify(process.env.CLIENT_SECRET),
      'process.env.CLIENT_ID' : JSON.stringify(process.env.CLIENT_ID)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template : path.resolve(__dirname,'src/index.html'),
      filename :'./index.html'
    }),
    new MiniCSS({
      filename : 'css/app.css'
    })
  ]
}