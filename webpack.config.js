const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode:'production',
  entry: './src/index.js',
  output: {
    filename: 'react-fullslip.min.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  externals: [
    nodeExternals()
  ]
};
