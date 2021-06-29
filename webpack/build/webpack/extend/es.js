const { join } = require('path');
const { excludeFile } = require('../../../utils/ignore');

// es 延展
module.exports = ({}, { module }) => {
  const commonLoader = {
    test: /\.(jsx|js|ts|tsx)?$/,
    loader: 'babel-loader',
    exclude: excludeFile,
    options: {
      sourceMaps: true,
      babelrc: true,
      // cacheDirectory: true,
      configFile: join(__dirname, `../../../config/.babelrc`),
    },
  };

  module.rules.push(commonLoader);
};
