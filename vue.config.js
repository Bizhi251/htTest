// vue.config.js
module.exports = {
  devServer: {
    /**
     * vue-cli3跨域的全配置！
     */
    proxy: {
      '/api': {
        // 你要跨域的域名(包含host、端口号,切记：一定要带上http头);
        // 同一个域名只能设置一次跨域，否则重复报错！
        target: 'http://localhost:5000',
        changeOrigin: true, // 是否跨域，设置为true;(必须)
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  }
}
