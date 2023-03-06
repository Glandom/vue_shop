import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'

Vue.use(VueRouter)

const routes = [
  // 如果访问的是 / 则重定向 login 页面
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: Params
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to代表将要取得
  // from 表示从那个路径过来
  // next 是一个函数，表示放行  next() 放心   next('/path') 强制跳转的页面路径
  // 如果进入的为登录页，则放行
  if (to.path === '/login') return next()
  // 否则 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果没有 token 则 直接强制跳转到 登录页面，否则放行
  if (!tokenStr) return next('/login')
  next()
})
export default router
