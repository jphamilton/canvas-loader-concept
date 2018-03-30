var webpack = require('webpack');

module.exports = {  
  mode: 'production',
  entry: './src/loader.ts',
  optimization: {
    minimize: true
  },
  output: {
    filename: './build/loader.js'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}