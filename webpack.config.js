const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './bootstrap.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bootstrap.js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      scriptLoading: 'defer',
    }),
    new CopyPlugin({
      patterns: [{ from: 'app/assets', to: 'assets' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'app'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
};
