const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const sourceMap = require('./webpack/sourceMap');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const favicon = require('./webpack/favicon');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: {
      index: `${PATHS.source}/pages/index/index.js`,
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: `${PATHS.source}/pages/index/index.pug`,
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
  pug(),
  images(),
  babel(),
]);

module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([common, extractCSS(), favicon()]);
  }
  if (argv.mode === 'development') {
    return merge([common, devserver(), sass(), css(), sourceMap()]);
  }
};
