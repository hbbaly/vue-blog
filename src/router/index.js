import Vue from 'vue'
import Router from 'vue-router'
// route-level code splitting
const Index = () => import('../views/front/Index.vue')
const AdminView = () => import('../views/admin/index.vue')
const ArticleDetail = () => import('../views/front/ArticleDetail.vue')
const TimeLine  = () => import('../views/front/TimeLine.vue')
const Tags  = () => import('../views/front/Tags.vue')
const ArticleList  = () => import('../views/front/ArticleList.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView
    },
    {
      path: '/article/:_id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/timeline',
      name: 'TimeLine',
      component: TimeLine
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/:type/article',
      name: 'ArticleList',
      component: ArticleList
    }
  ]
})
