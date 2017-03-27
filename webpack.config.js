/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css$/, loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000'
    }, {
      test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'
    }]
  }
}



// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
var src = path.join(__dirname, '..', '..', 'src')
var fs = require('fs')
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { 'react-router-redux': src } }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: src
  });
}
