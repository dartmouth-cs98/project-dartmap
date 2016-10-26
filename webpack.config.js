// webpack.config.js
// Configuration file for Webpack
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  stats: { colors: true },
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    './src', //this is where our app lives
  ],
  output: {
    path: 'build',
    publicPath: 'build/',
    filename: 'bundle.js',
    //outputs everything to build/bundle.js
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    },
    {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
    },
    // You could also use other loaders in the same way. I. e. the autoprefixer-loader
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
};

