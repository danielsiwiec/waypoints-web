var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './public/main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /.json$/,
        loader: 'json'
      }
    ]
  },
  devServer: {
    port: 5000
  }
};
