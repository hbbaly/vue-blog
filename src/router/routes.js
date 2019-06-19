import Index from '@/view/index/IndexView'
import Register from '@/view/user/register/IndexView'
import Login from '@/view/user/login/IndexView'
import User from '@/view/user/index/IndexView'
import CreateArticle from '@/view/user/article/create/IndexView'
import ArticleList from '@/view/user/article/list/IndexView'
import Tag from '@/view/user/article/tag/IndexView'
export default [
  {
    path:'/',
    component:Index,
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: '/article/create',
        component: CreateArticle
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/article/tag',
        component: Tag
      }
    ]
  },
  {
    path: '/user/register',
    component: Register
  },
  {
    path: '/user/login',
    component: Login
  }
]
