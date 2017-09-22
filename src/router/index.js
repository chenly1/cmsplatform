import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Home from '@/views/Home'
import NotFound from '@/views/404.vue'

import ModelTable from '@/views/nav1/ModelTable.vue'
import ModelTableEdit from '@/views/nav1/ModelTableEdit.vue'
import CarouselMap from '@/views/nav1/CarouselMap.vue'
import Material from '@/views/nav1/Material.vue'
import articleMangment from '@/views/article/mangement.vue'
import articleCreate from '@/views/article/create.vue'
import articleSearch from '@/views/article/search.vue'
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
        { path: '/modelTableEdit', component: ModelTableEdit, name: '模版消息_编辑' },
        { path: '/carouselMap', component: CarouselMap, name: '轮播图管理' },
        { path: '/material', component: Material, name: '素材管理' },
        {
          path: '/article/mangement',
          component: articleMangment,
          name: '文章列表',
          redirect: '/article/search',
          children: [
            { path: '/article/search', component: articleSearch, name: '文章列表' },
            { path: '/article/create/:purposeType', component: articleCreate, name: '创建文章' }
          ]
        },
        // { path: '/eduForm', component: eduForm, name: '健康教育' },
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
