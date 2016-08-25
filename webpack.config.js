/**
 * The webpack file for react libraries
 */

var path = require("path");
var webpack = require("webpack");
var env = process.env.NODE_ENV;

const config = {
  devtool: 'source-map',
  entry: {
    app: ['./src/client/index']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: __dirname
      }
    ]
  },
  output: {
    filename: 'dist.js',
    path: path.join(__dirname, './src/public/js'),
    publicPath: '/static'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};


if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
