// vue.config.js
const libConfig = require('./build/gen-lib.js')
const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction---', isProduction)
const cdn = {
  css: [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vue-router@3.1.6/dist/vue-router.js',
    'https://unpkg.com/element-ui/lib/index.js'
  ]
}
const siteConfig = {
  // 将 examples 目录添加为新的页面
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 输出文件名
  //     filename: 'index.html'
  //   }
  // },
  configureWebpack: config => {
    console.log('模式：product')
    // console.log('configureWebpack---config---', config)
    if (isProduction) {
      console.log('true')
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
      }
    }
  },
  chainWebpack: config => {
    if (isProduction) {
      config.plugin('html').tap(args => {
        console.log('args---', args)
        args[0].cdn = cdn
        return args
      })
    }
  }
}
console.log('proce---', process.env.BuildTarget)
module.exports = process.env.BuildTarget === 'lib' ? libConfig : siteConfig