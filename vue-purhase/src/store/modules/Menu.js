//存储动态路由导航
//导入api接口
import { permission } from '@/api/index'
//导入前端定义好的路由文件
import { menu } from '@/router/menulist.js'
//导入一个方法来筛选路由
import { rulesMenu } from '@/utils/rulesMenu.js'
export default {
  namespaced: true,
  state: {
    dyMenuList: []//动态导航路由
  },
  getters: {},
  mutations: {
    setMenuList(state, payload) {
      state.dyMenuList = payload
    },
    deleteMenuList(state) {
      state.dyMenuList = []
    }
  },
  actions: {
    //定义获取路由的网络请求方法
    getMenuList({ commit, state, rootState }) {
      permission({ token: rootState.Login.userinfo.token }).then((res) => {
        console.log('后端获取的动态路由-----', res.data.data);
        console.log('前端的路由-------------', menu);
        //比较前后端的路由文件，筛选出符合后端路由规则的前端路由
        let menus = rulesMenu(menu, res.data.data)
        console.log(menus);
      })
    }
  }
};