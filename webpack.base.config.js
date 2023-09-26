const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bootstrap.js',
  },
  plugins: [
    new CopyWebpackPlugin(['starter-data.json'])
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
};
