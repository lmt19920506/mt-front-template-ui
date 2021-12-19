console.log('模式：lib')
module.exports = {
  filenameHashing: true,
  productionSourceMap: false,
  lintOnSave: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false
  },
  pluginOptions: {
    storybook: {
      allowedPlugins: ['define']
    }
  },
  configureWebpack: config => {
    config.mode = 'production',
    config.output.library = 'SHOWUI',
    config.output.umdNamedDefine = true;
    config.externals = {
      'element-ui': 'ELEMENT',
      loadsh: 'lodash',
      dayjs: 'dayjs',
      vue: 'Vue',
      axios: 'axios',
      echarts: 'echarts'
    }
  },
  chainWebpack: config => {
    // preserveWhitespace 是 compilerOptions对象中的属性之一。
    // 如果设置为false,标签之间的空白将会忽略，这可能会导致性能稍好，但可能会影响嵌入式元素的布局。
    // true表示编译的渲染函数将会保留HTML标记之间的所有空白字符。
    // 官网：https://vue-loader.vuejs.org/zh/options.html#transformasseturls
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
    })
    .end();
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 20000
        return options
      })
      .end()
  }
}