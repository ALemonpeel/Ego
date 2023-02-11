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
//系统管理
import Management from '@/views/MyLayout/Management'
import Role from '@/views/MyLayout/Management/Role'
import Department from '@/views/MyLayout/Management/Department'



export const menu = [
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
    meta: {
      title: "广告列表"
    },
    children: [
      {
        path: 'advertlist',
        name: 'advertlist',
        component: AdvertList,
        meta: {
          title: "分类管理"
        },
      },
    ]
  },
  {
    path: '/management',
    name: 'management',
    component: Management,
    redirect: '/management/role',
    meta: {
      title: "系统管理"
    },
    children: [
      {
        path: 'role',
        name: 'role',
        component: Role,
        meta: {
          title: "角色管理"
        },
      },
      {
        path: 'department',
        name: 'department',
        component: Department,
        meta: {
          title: "部门管理"
        },
      }
    ]
  }
]