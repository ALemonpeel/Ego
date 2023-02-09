import Vue from 'vue'
import VueRouter from 'vue-router'
//点击跳转同一个路径
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => { })
}
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
import AddGoods from '@/views/MyLayout/Goods/list/AddGoods.vue'
//广告管理
import Advert from '@/views/MyLayout/Advert'
import AdvertList from '@/views/MyLayout/Advert/list'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MyLayout,
    meta: {
      title: "首页"
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
      {
        path: '/goods',
        name: 'goods',
        meta: {
          title: "产品管理"
        },
        redirect: '/goods/list',
        component: Goods,
        children: [
          {
            path: 'list',
            name: 'list',
            component: List,
            meta: {
              title: "产品列表"
            },
          },
          {
            path: 'category',
            name: 'category',
            component: Category,
            meta: {
              title: "产品分类"
            },
          },
          {
            path: 'addgoods',
            name: 'addgoogs',
            component: AddGoods,
            //路由元信息
            meta: {

              activeMenu: '/goods/list'
            }
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
          title: "订单管理"
        },
        redirect: '/order/orderlist',
        children: [
          {
            path: 'orderlist',
            name: 'orderlist',
            component: OrderList,
            meta: {
              title: "订单列表"
            },
          },
          {
            path: 'auditing',
            name: 'auditing',
            component: Auditing,
            meta: {
              title: "汇总清单"
            },
          },
          {
            path: 'collect',
            name: 'collect',
            component: Collect,
            meta: {
              title: "订单审核"
            },
          }
        ]
      },
      {
        path: '/advert',
        name: 'advert',
        component: Advert,
        redirect: '/advert/advertlist',
        children: [
          {
            path: 'advertlist',
            name: 'advertlist',
            component: AdvertList
          },
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
