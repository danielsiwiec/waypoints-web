var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './public/main.js',
  output: { path: __dirname + '/public', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devServer: {
    port: 5000
  },
  devtool: 'source-map'
}

new webpack.optimize.UglifyJsPlugin({
  compress: {
    dead_code: true
  }
})
