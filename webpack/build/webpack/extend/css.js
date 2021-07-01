const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ isDev = false, isUmd = false, px2remUedWidth = null }, config) => {
  const lessLoaders = [
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
  ];

  // 是否需要支持 px to rem
  // +px2remUedWidth &&
  //   lessLoaders.push({
  //     loader: 'px2rem-loader',
  //     options: {
  //       remUni: px2remUedWidth / 10, // 适合750的设计稿 1rem = 75px
  //       remPrecision: 4, // px转rem小数点保留的位置
  //     },
  //   });

  // postcss 预处理
  lessLoaders.push({
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev,
      postcssOptions: {
        plugins: [
          'postcss-preset-env',
          'cssnano',
          'autoprefixer',
          [
            'postcss-pxtorem',
            {
              rootValue: px2remUedWidth / 10,
              unitPrecision: 5,
              // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
              // selectorBlackList: [],
              // replace: true,
              // mediaQuery: false,
              // minPixelValue: 0,
              exclude: /node_modules/i,
            },
          ],
        ],
      },
    },
  });

  // 默认支持 less
  config.module.rules.push({
    test: /\.(less|css)$/,
    use: lessLoaders,
  });
};
