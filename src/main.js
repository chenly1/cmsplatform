// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router' // 路由
// import VueRouter from 'vue-router'// 路由

import ElementUI from 'element-ui' // element-ui
// import 'element-ui/lib/theme-default/index.css' // element-ui
import './assets/theme/element-theme/index.css' // element-theme-#82c341
import 'font-awesome/css/font-awesome.min.css' // Font Awesome icon图标库

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

// import VueResource from 'vue-resource'
// Vue.use(VueResource)
Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
}).$mount('#app')
