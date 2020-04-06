const path = require('path');

module.exports = {
  mode: 'development',
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
      SCSS: path.resolve(__dirname, 'src/styles/scss'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
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
      },
      {
        test: /\.js$/,
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
