module.exports = {
  proxyList: {
    '/apis': {
      // 测试环境
      target: 'http://127.0.0.1:3000',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/apis': '',   //需要rewrite重写的,
      },
      logLevel:'debug' 
    },
    '/static/UE/controller.jsp': {
      target: 'http://192.168.0.249:9081/controller.jsp',  // 接口域名
      changeOrigin: true, //是否跨域  ,
      pathRewrite: {
        '^/static/UE/controller.jsp': ''   //需要rewrite重写的,
      },
      logLevel:'debug' 
    },
    '/video': {
      target: 'http://192.168.0.249:9081',  // 接口域名
      changeOrigin: true, //是否跨域  , 
      logLevel:'debug'  

    }
  }
}