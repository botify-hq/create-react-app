'use strict';

const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonJs = path.resolve(
  fs.realpathSync(process.cwd()),
  '../common-js/src'
);

const getSCSSLoaderConfig = isDev => {
  const loaders = [
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: !isDev,
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 10', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    require.resolve('sass-loader'),
  ];

  if (isDev) {
    return {
      test: /\.scss$/,
      use: [require.resolve('style-loader'), ...loaders],
    };
  }

  return {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: require.resolve('style-loader'),
      use: loaders,
    }),
  };
};

module.exports = {
  babelPlugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
  webpackLoaders: [getSCSSLoaderConfig(process.env.NODE_ENV !== 'production')],
  allowedSrc: [commonJs], // These are folders that needs to be processed with Babel
  alias: {
    'common-js': commonJs,
  },
};
