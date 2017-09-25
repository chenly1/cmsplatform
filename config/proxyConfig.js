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
    '/controller': {
      target: 'http://192.168.0.249:9081',  // 接口域名
      changeOrigin: true, //是否跨域  ,
      logLevel:'debug' 
    },
    '/video': {
      target: 'http://192.168.0.249:9081',  // 接口域名
      changeOrigin: true, //是否跨域  , 
      logLevel:'debug'  
    },
    '/manager': {
      target: 'http://192.168.0.249:9082',  // 接口域名
      changeOrigin: true, //是否跨域  , 
      logLevel:'debug'  
    },
    '/api/article/show/':{
      target: 'http://192.168.0.249:9082',  // 接口域名
      changeOrigin: true, //是否跨域  , 
      logLevel:'debug'  
    },
    '/manager/article/preview/':{
      target: 'http://192.168.0.249:9082',  // 接口域名
      changeOrigin: true, //是否跨域  , 
      logLevel:'debug'  
    }
}
}