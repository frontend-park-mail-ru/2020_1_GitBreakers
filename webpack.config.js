const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  // mode: 'deve',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: '[name].js',
    // path: path.resolve(__dirname, 'public/dist/static'),
    // publicPath: '/static/',
    // filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      Views: path.resolve(__dirname, 'src/views/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Controllers: path.resolve(__dirname, 'src/controllers/'),
      Models: path.resolve(__dirname, 'src/models/'),
      Modules: path.resolve(__dirname, 'src/modules'),
    },
  },
  module: {
    rules: [
      {
        test: /\.pug/,
        use: 'pug-loader',
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime'],
            ],
          },
        },
      },
    ],
  },
};
