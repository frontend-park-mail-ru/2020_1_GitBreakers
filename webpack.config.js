const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'bundle.js',
    // path: path.resolve(__dirname, 'public/dist/static'),
    // publicPath: '/static/',
    // filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.pug/,
        use: 'pug-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};
