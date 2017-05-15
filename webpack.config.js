var path = require('path');

module.exports = {
  devtool: 'eval',
  context: path.join(__dirname, 'src'),
  entry: {
    app: ['./index.js']
  },
  output: {
    path: path.join(__dirname ,'public','js'),
    publicPath: 'js/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: [
            'react',
            'latest',
            'stage-1'
          ],
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname ,'public'),
  },
};
