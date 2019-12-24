const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',            
  entry: [
    './src/utils/polyfills.js',
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test:   /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader'
        ]
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
  devServer: {
    contentBase: './build'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './build/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
  ],
  target: "web",
  stats: false
};
