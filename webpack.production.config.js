var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: [
    './client.js'
  ],
  plugins: [
    new CopyWebpackPlugin([
        { from: 'dist/main.css', to: 'main.css' },
        { from: 'dist/fonts', to: 'fonts' }
    ])
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/deploy',
    publicPath: '/',
    filename: 'bundle.js'
  }
};

module.exports = config;
