const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');

module.exports = merge(base, {
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({
    template: './app/index.html',
    scriptLoading: 'defer'
  })],
});
