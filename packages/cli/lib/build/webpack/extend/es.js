const { join } = require('path');
const { excludeFile } = require('../../../utils/ignore');

// es 延展
module.exports = (arg, { module }) => {
  module.rules.push({
    test: /\.(jsx|js|ts|tsx)$/,
    loader: 'babel-loader',
    exclude: excludeFile,
    options: {
      sourceMaps: true,
      babelrc: true,
      configFile: join(__dirname, '../../../config/.babelrc'),
    },
  });
};
