const { join } = require('path');
const { existsSync } = require('fs');
const webpack = require('webpack');

const { excludeFile } = require('../../utils/ignore');
const { getPackageInfo } = require('../../utils/getConfig');

const { getProjectEntry, getUmdEntry } = require('./extend/entry');
const useCss = require('./extend/css');
const useMarkdown = require('./extend/markdown');
const useCopy = require('./extend/copy');
const useES = require('./extend/es');
const useSplit = require('./extend/split');

// 获取 loader 包地址
// 本地 npm link 按照相对目录检索
const getLoaderModulesPath = () => {
  // 故需要判断 cli 是否存在于当前项目下
  const projectPath = process.cwd();
  const loaderPath = join(__dirname, '../../../node_modules');
  const loaderLernaPath = join(__dirname, '../../../../../node_modules');
  const localPath = join(projectPath, 'node_modules');
  const localLernaPath = join(projectPath, '../../node_modules');

  const paths = [];

  // project node_modules
  existsSync(localPath) && paths.push(localPath);

  // project lerna node_modules
  existsSync(localLernaPath) && paths.push(localLernaPath);

  // cli node_modules
  existsSync(loaderPath) && paths.push(loaderPath);

  // lerna 下 node_modules
  existsSync(loaderLernaPath) && paths.push(loaderLernaPath);

  return paths.length ? { modules: paths } : null;
};

module.exports = (
  {
    isUmd = false, // 是否 umd 打包
    isDev = true,
    resolvePath = './src',
    target = 'src',
    buildPath = 'dist',
    publicPath = '/',
    copyPath = 'src/public',
    markdown = false, // 是否支持 markdown 解析 html
    splitPackages = [],
    getPlugins = null,
  },
  {
    loaders = [],
    plugins = [],
    devServer = {},
    externals = {}, // 禁用某些包引入bundle
    output = {},
  },
) => {
  // 打包后 chunk 名称
  // contenthash 基于内容变动改变 hash
  const chunkName = isDev || isUmd ? '' : '[contenthash:5].';
  const entryGetter = isUmd
    ? getUmdEntry({ target })
    : getProjectEntry({ isDev, target, buildPath, splitPackages });

  // 修复部分组件依赖 NODE_ENV 环境变量问题
  process.env.NODE_ENV = isDev ? 'development' : 'production';

  const baseConfig = {
    // 缓存加速
    cache: {
      type: 'filesystem',
    },

    // 环境变量配置
    // 支持 `webpack --mode=development/production`
    mode: isDev ? 'development' : 'production',

    devtool: isDev ? 'inline-source-map' : false,

    devServer,

    externals,

    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      alias: {
        '@': join(process.cwd(), resolvePath),
      },
    },

    resolveLoader: {
      // loader 包解析路径配置
      ...getLoaderModulesPath(),
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    },

    // 模块配置入口
    // string|Array<string>
    // {[entryChunkName: string]: string|Array<string>}
    entry: entryGetter.entry,

    // 模块输出配置
    output: {
      path: join(process.cwd(), buildPath),
      publicPath,
      filename: isUmd
        ? '[name]/index.js'
        : `static/scripts/[name].${chunkName}js`,
      sourceMapFilename: isUmd
        ? '[name]/index.map'
        : `static/scripts/[name].${chunkName}map`,
      chunkFilename: isUmd
        ? '[name]/[name].js'
        : `static/scripts/[name].${chunkName}js`,
      ...output,
    },

    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|ico)$/,
          loader: 'file-loader',
          options: {
            name: `[name].[ext]${isDev ? '' : `?${chunkName}`}`,
            useRelativePath: false,
            outputPath: 'static/images',
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: excludeFile,
        },

        ...loaders,
      ],
    },

    plugins: [...entryGetter.plugins, ...plugins],
  };

  if (isDev) {
    // tree shaking
    baseConfig.optimization = { ...baseConfig.optimization, usedExports: true };
    baseConfig.plugins.push(new webpack.ProgressPlugin());
  }

  // 加载 css 预编译相关配置
  useCss({ isDev, isUmd }, baseConfig);

  // 加载 markdown 配置
  useMarkdown(markdown, baseConfig);

  // 加载代码分拆配置
  useSplit({ isUmd, splitPackages }, baseConfig);

  // 加载 复制文件 相关配置
  useCopy(copyPath, baseConfig);

  // 加载 es 相关配置
  useES({}, baseConfig);

  // 加载外部 plugins
  const otherPlugins = getPlugins
    ? getPlugins({ isDev, ...getPackageInfo() })
    : null;

  otherPlugins && baseConfig.plugins.push(...otherPlugins);

  return baseConfig;
};
