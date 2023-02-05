import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
import MyLogin from '@/views/MyLogin/MyLogin.vue'
import MyLayout from '@/views/MyLayout/MyLayout.vue'
import Home from '@/views/Home'
//产品管理
import Goods from '@/views/MyLayout/Goods'
import Category from '@/views/MyLayout/Goods/Category'
import List from '@/views/MyLayout/Goods/list'
//订单管理
import Order from '@/views/MyLayout/Order'
import Auditing from '@/views/MyLayout/Order/Auditing'
import OrderList from '@/views/MyLayout/Order/list'
import Collect from '@/views/MyLayout/Order/Collect'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MyLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/goods',
        name: 'goods',
        component: Goods,
        children: [
          {
            path: 'list',
            name: 'list',
            component: List
          },
          {
            path: 'category',
            name: 'category',
            component: Category
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        component: Order,
        children: [
          {
            path: 'orderlist',
            name: 'orderlist',
            component: OrderList
          },
          {
            path: 'auditing',
            name: 'auditing',
            component: Auditing
          },
          {
            path: 'collect',
            name: 'collect',
            component: Collect
          }
        ]
      },
    ]
  },
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
