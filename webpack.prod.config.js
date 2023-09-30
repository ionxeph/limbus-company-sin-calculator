const base = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '',
      scriptLoading: 'defer',
      template: './app/index.html',
    }),
  ],
});
