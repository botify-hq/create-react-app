'use strict';

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postCssOptions = {
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
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
};

const getSCSSLoaderConfig = isDev => {
  const loaders = [
    {
      loader: require.resolve('css-loader'),
      options: Object.assign({}, { minimize: !isDev }, { importLoaders: 1 }),
    },
    {
      loader: require.resolve('postcss-loader'),
      options: postCssOptions,
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

module.exports = (isDev = true) => ({
  babelPresets: [require.resolve('babel-preset-stage-0')],
  babelPlugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
  webpackLoaders: [getSCSSLoaderConfig(isDev)],
});
