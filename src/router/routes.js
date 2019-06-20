import Index from '@/view/index/IndexView'
import Register from '@/view/user/register/IndexView'
import Login from '@/view/user/login/IndexView'
import User from '@/view/user/index/IndexView'
import CreateArticle from '@/view/user/article/create/IndexView'
import ArticleList from '@/view/user/article/list/IndexView'
import Tag from '@/view/user/article/tag/IndexView'
import ChangePass from '@/view/user/changepass/IndexView'
import Detail from '@/view/user/article/detail/IndexView'
import NotFound from '@/view/notfound/NotFoundView'
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
        path:'',redirect: {name:'CenArticleCreateter'}
      },
      {
        name: 'ArticleCreate',
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
      },
      {
        path: '/settings/changepass',
        component: ChangePass
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
  },
  {
    path: '/user/article/detail/:_id',
    component: Detail
  },
  {
    name: 'NotFound',
    path:'*',
    component: NotFound
  }
]
