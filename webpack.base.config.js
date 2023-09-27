const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bootstrap.js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
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
