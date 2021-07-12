/**
 * 代码拆分
 *
 * @param {*} {splitPackages} 单独拆分 chunk 包
 * @param {*} webpackConfig
 */
module.exports = ({ isUmd = false, splitPackages = [] }, webpackConfig) => {
  if (isUmd) return;

  webpackConfig.optimization = isUmd
    ? { ...webpackConfig.optimization, minimize: false }
    : {
        ...webpackConfig.optimization,
        splitChunks: {
          automaticNameDelimiter: '.',
          chunks: 'async',
          cacheGroups: {
            vendors: {
              name: 'common',
              // chunks: 'all',
              // test: /[\\/]node_modules[\\/]/,
              priority: 1,
              reuseExistingChunk: true,
            },
          },
        },
        runtimeChunk: {
          name: 'common',
        },
      };
};
