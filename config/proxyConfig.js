module.exports = {
    proxyList: {
          '/apis': {
              // 测试环境
              target: 'http://127.0.0.1:3000',  // 接口域名
              changeOrigin: true,  //是否跨域
              pathRewrite: {
                  '^/apis': ''   //需要rewrite重写的,
              }
            },
              '/net': {
                // 测试环境
                target: 'http://localhost:2105/Content/Ueditor/',  // 接口域名
                changeOrigin: true  //是否跨域        
          }
    }
  }