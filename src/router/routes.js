import Index from '@/view/index/indexView'
import Register from '@/view/user/register/IndexView'
import Login from '@/view/user/login/IndexView'
import User from '@/view/user/index/indexView'
export default [
  {
    path:'/',
    component:Index,
  },
  {
    path: '/user',
    component: User
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
