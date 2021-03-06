const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '/src/sw.js'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon'),
        to: path.resolve(__dirname, 'dist/favicon'),
      },
      {
        from: path.resolve(__dirname, 'src/styles/img'),
        to: path.resolve(__dirname, 'dist/img'),
      }
    ]),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
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
        test: /\.css$/,
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
          // 'sass-loader',
        ],
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
      {
        test: /\.ts$/,
        use: 'ts-loader',
        // enforce: 'pre',
        // loader: 'tslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug/,
        use: 'pug-loader',
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
