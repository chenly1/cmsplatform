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
    '/static/UE/net/controller.ashx': {
      target: 'http://192.168.0.249:2105/Content/Ueditor/net/controller.ashx',  // 接口域名
      changeOrigin: true  //是否跨域        
    },
    '/Content/ueditor/net/':{
      target:'http://192.168.0.249:2105/Content/ueditor/net/',
      changeOrigin:true,
      router: function(req) {
        return 'http://192.168.0.249:2105/Content/ueditor/net/';
    }
    }
    

  }
}