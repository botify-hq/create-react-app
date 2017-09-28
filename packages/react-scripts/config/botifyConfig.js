'use strict';

const autoprefixer = require('autoprefixer');

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

module.exports = {
  babelPresets: [require.resolve('babel-preset-stage-0')],
  babelPlugins: [require.resolve('babel-plugin-transform-decorators-legacy')],
  webpackLoaders: [
    {
      test: /\.scss$/,
      loaders: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        {
          loader: require.resolve('postcss-loader'),
          options: postCssOptions,
        },
        require.resolve('sass-loader'),
      ],
    },
  ],
};
