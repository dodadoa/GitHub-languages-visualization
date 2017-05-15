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
        loader: 'babel',
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
      {
        test: /\.css$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]'
        ]
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname ,'public'),
  },
};
