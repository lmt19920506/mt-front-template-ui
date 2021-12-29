// gzip压缩   npm install --save-dev compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //引入插件
//压缩代码并去掉console   
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");  // npm install uglifyjs-webpack-plugin --save-dev

const isProduction = process.env.NODE_ENV === 'production'
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  "element-ui": "ELEMENT",
  "echarts": "echarts"
}

const cdn = {
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
    'https://unpkg.com/element-ui/lib/index.js',
    'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js'
  ]
}



module.exports = {
  // chainWebpack: (config) => {
  //   config.when(process.env.NODE_ENV === 'production', config => {
  //     config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  // })
  // },
  chainWebpack: (config) => {
    // config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    config.optimization.minimize(true); // 压缩代码

    config.optimization.splitChunks({
      // 分割代码
      chunks: "all",
    });
    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn
      }
      return args
    })
    if (isProduction) {
      config.optimization.splitChunks({
        chunks: 'async',
        minSize: 1024 * 10,  // 30000
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          echarts: {
            name: 'echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          moment: {
            name: 'moment',
            test: /[\\/]node_modules[\\/]moment[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          xlsx: {
            name: 'xlsx',
            test: /[\\/]node_modules[\\/]xlsx[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
    }
  },
  configureWebpack: config => {
    const plugins = []
    if (process.env.NODE_ENV === 'production') {
      // return {
      //   externals: externals,
      // }
      config.externals = externals
    }
    // 启用代码压缩
    plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ["console.log"] //移除console
          },
          warnings: false,
        },
        sourceMap: false,
        parallel: true
      })
    )
    // gzip压缩
    plugins.push(
      new CompressionWebpackPlugin({
        filename: info => {
          // console.log('压缩---info---', info)
          return `${info.path}.gz${info.query}`
        },
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.css/,
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      })
    );
    config.plugins = [...config.plugins, ...plugins]
  }
};
