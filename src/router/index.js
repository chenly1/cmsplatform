import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Home from '@/views/Home'
import NotFound from '@/views/404.vue'

import ModelTable from '@/views/nav1/ModelTable.vue'
import Material from '@/views/nav1/Material.vue'
import ue from '@/views/editor.vue'

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
      leaf: true, // 只有一个节点
      redirect: '/hello',
      children: [
        { path: '/hello', component: Hello, name: '主页' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'fa fa-subway', // 图标样式class
      children: [
        { path: '/modelTable', component: ModelTable, name: '模版消息' },
        { path: '/material', component: Material, name: '素材管理' },
        { path: '/editor', component: ue, name: 'editor', class: 'fa-plug' }
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
