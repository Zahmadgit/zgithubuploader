const { plugins } = require('./forge.config');
const rules = require('./webpack.rules');
// const dotenv = require('dotenv');
// const webpack = require('webpack');
// dotenv.config();
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN),
  //   }),
  // ],
};
