const path = require('path')

const resolve = dir => path.join(__dirname, dir)
module.exports = {
  // 默认'/'，部署应用包时的基本 URL
  publicPath: './',

  // 'dist', 生产环境构建文件的目录
  outputDir: 'dist',

  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: '',

  lintOnSave: false,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 生产环境的 source map
  productionSourceMap: false,
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
