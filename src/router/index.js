import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import NotFound from '@/components/404.vue'

import Form from '@/components/nav1/Form.vue'
import Form2 from '@/components/nav1/Form2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '管理系统',
        iconCls: 'fa fa-th-large',
        leaf: true,//只有一个节点
        children: [
            { path: '/hello', component: Hello, name: '主页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'fa fa-subway',//图标样式class
        children: [
          { path: '/form', component: Form, name: 'form表单' },
          { path: '/form2', component: Form2, name: 'form验证' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
  ]
});
