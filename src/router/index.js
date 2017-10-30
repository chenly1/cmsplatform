import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Home from '@/views/Home'
import NotFound from '@/views/404.vue'

// 模版消息
import ModelTable from '@/views/nav1/ModelTable.vue'
import ModelTableEdit from '@/views/nav1/ModelTableEdit.vue'
// 轮播图管理
import CarouselMapSearch from '@/views/carouselMap/search.vue'
import CarouselMapEdit from '@/views/carouselMap/edit.vue'
import CarouselMapMangement from '@/views/carouselMap/mangement.vue'
// 文章素材
import Material from '@/views/nav1/Material.vue'
import articleMangment from '@/views/article/mangement.vue'
import articleSearch from '@/views/article/search.vue'
import articleEdit from '@/views/article/edit.vue'
import ue from '@/views/editor.vue'
import videoUpload from '@/components/videoUpload/videoUpload.vue'
// 视频管理
import videoMangement from '@/views/video/mangement.vue'
import videoSearch from '@/views/video/search.vue'
import videoCreate from '@/views/video/create.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '管理系统',
      iconCls: 'fa fa-home',
      leaf: true, // 只有一个节点
      redirect: '/hello',
      children: [
        { path: '/hello', component: Hello, name: '主页' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '内容管理',
      iconCls: 'fa fa-th-large', // 图标样式class
      children: [
        { path: '/modelTable', component: ModelTable, name: '模版消息', hidden: true},
        { path: '/modelTableEdit', component: ModelTableEdit, name: '模版消息_编辑', hidden: true},
        {
          path: '/carouselMap/mangement',
          component: CarouselMapMangement,
          redirect: '/carouselMap/search',
          name: '轮播图管理',
          children: [
            { path: '/carouselMap/search', component: CarouselMapSearch, name: '轮播图管理' },
            { path: '/carouselMap/edit', component: CarouselMapEdit, name: '轮播图管理_编辑' }
          ]
        },
        { path: '/material', component: Material, name: '素材管理', hidden: true },
        {
          path: '/article/mangement',
          component: articleMangment,
          name: '文章管理',
          redirect: '/article/search',
          children: [
            { path: '/article/search', component: articleSearch, name: '文章管理' },
            { path: '/article/edit/:rowid', component: articleEdit, name: '文章管理_编辑' }
          ]
        },
        {
           path: '/video/mangement',
           component: videoMangement,
           name: '视频管理',
           redirect: '/video/search',
           children: [
             { path: '/video/search', component: videoSearch, name: '视频管理' },
             { path: '/video/create', component: videoCreate, name: '视频上传' }
           ]
        },
        {
           path: '/article/videoUpload', component: videoUpload, name: '视频上传'
        },
        { path: '/editor', component: ue, name: 'editor', class: 'fa-plug', hidden: true}
      ]
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
