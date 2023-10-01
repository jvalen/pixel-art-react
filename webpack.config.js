const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[\d.]+)?(\?[a-z0-9#-]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: './css/[hash].[ext]',
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      buffer: require.resolve("buffer/"),
      assert: require.resolve("assert/"),
    },
  },
  devServer: {
    static: './build'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/favicon.ico', to: 'favicon.ico' },
        { from: 'src/assets/bmac-icon.png', to: 'bmac-icon.png' }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new HtmlWebpackPlugin({
      template: './build/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  target: "web",
  stats: false
};
