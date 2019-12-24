const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  mode: "production",
  entry: [
    './src/utils/polyfills.js',
    './src/index.jsx',
  ],
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/favicon.ico', to: 'favicon.ico' },
      { from: 'src/assets/apple-touch-icon.png', to: 'apple-touch-icon.png' },
      { from: 'src/assets/regular-icon.png', to: 'regular-icon.png' }
    ]),
    new ExtractTextPlugin({
      filename: "css/main.css"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  target: "web",
  stats: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:   /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[\d.]+)?(\?[a-z0-9#-]+)?$/,
        loader: 'url-loader?limit=100000&name=./css/[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/deploy'),
    publicPath: '/',
    filename: 'bundle.js'
  }
};

module.exports = config;
