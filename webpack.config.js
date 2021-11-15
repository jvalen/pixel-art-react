const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: {
    library: [
      './src/utils/polyfills.js',
      './src/lib-index.jsx',
    ],
    application: [
      './src/utils/polyfills.js',
      './src/index.jsx',
    ],
  },
  output: {
    path: path.join(__dirname, '/deploy'),
    publicPath: '/',
    filename: '[name].bundle.js',
    library: "pixel-art-react",
    libraryTarget: "umd",
    globalObject: 'this',
  },
  // Do not set externals because we use this config when running the application.
  // webpack.production.config.js is when importing as a library.
  // externals: {
  //   react: "react",
  //   'react-dom': "react-dom",
  //   reactDOM: "react-dom"
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // Allow it to run on pixel-art-react for when this is imported as a library
        exclude: /node_modules\/(?!pixel-art-react)/,
        use: [
          'babel-loader'
        ]
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
  devServer: {
    contentBase: './deploy'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './build/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/bmac-icon.svg', to: 'bmac-icon.svg' }
    ]),
    new ExtractTextPlugin({
      filename: "css/main.css"
    }),
  ],
  target: "web",
  stats: false
};
