const { plugins } = require('./forge.config');
const rules = require('./webpack.rules');
const dotenv = require('dotenv');
const webpack = require('webpack');
dotenv.config();
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});
rules.push({
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset/resource',
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN),
    }),
    new webpack.DefinePlugin({
      'process.env.GITHUB_TOKEN_NOTES': JSON.stringify(
        process.env.GITHUB_TOKEN_NOTES
      ),
    }),
  ],
};
