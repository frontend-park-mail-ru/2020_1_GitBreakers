const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

// const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  // context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '/src/sw.js'),
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      Views: path.resolve(__dirname, 'src/views/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Controllers: path.resolve(__dirname, 'src/controllers/'),
      Models: path.resolve(__dirname, 'src/models/'),
      Modules: path.resolve(__dirname, 'src/modules'),
      SCSS: path.resolve(__dirname, 'src/styles/scss'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,

            },
          },
          // Creates `style` nodes from JS strings
          // 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.pug/,
        use: 'pug-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },
};
