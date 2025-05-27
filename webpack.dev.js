// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: './dist',
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
});
