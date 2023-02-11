import Vue from 'vue'
import VueRouter from 'vue-router'
//点击跳转同一个路径
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => { })
}

Vue.use(VueRouter)
//导入组件
import MyLogin from '@/views/MyLogin/MyLogin.vue'
import MyLayout from '@/views/MyLayout/MyLayout.vue'
import Home from '@/views/Home'

export const baseRouter = [
  {
    path: '/',
    component: MyLayout,
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: "首页"
        }
      },
    ]
  },

]


const routes = [
  {
    path: '/login',
    name: 'login',
    component: MyLogin
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
