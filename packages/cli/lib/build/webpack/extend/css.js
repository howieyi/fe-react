const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ isDev = false, isUmd = false }, config) => {
  const cssLoaders = [
    isDev || isUmd ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        modules: false,
        importLoaders: 1,
      },
    },
  ];

  // 默认支持 scss
  config.module.rules.push({
    test: /\.(sass|scss|css)$/,
    use: [
      ...cssLoaders,
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDev,
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
  });

  config.module.rules.push({
    test: /\.less$/,
    use: [
      ...cssLoaders,
      {
        loader: 'less-loader',
        options: {
          sourceMap: isDev,
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  });
};
