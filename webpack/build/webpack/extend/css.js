const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ isDev = false, isUmd = false }, config) => {
  // 默认支持 less
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/,
      use: [
        isDev || isUmd ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: isDev,
            modules: false,
            importLoaders: 1,
          },
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: isDev,
            webpackImporter: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: isDev,
            postcssOptions: {
              plugins: ['postcss-preset-env', 'cssnano', 'autoprefixer'],
            },
          },
        },
      ],
    }
  );
};
