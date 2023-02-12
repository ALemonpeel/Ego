//存储动态路由导航
//导入api接口
import { permission } from '@/api/index'
//导入前端定义好的路由文件
import { menu } from '@/router/menulist.js'
//导入一个方法来筛选路由
import { rulesMenu } from '@/utils/rulesMenu.js'
//导入基本的路由配置
import { baseRouter } from '@/router'
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
      return new Promise((resolve, reject) => {
        permission({ token: rootState.Login.userinfo.token }).then((res) => {
          console.log('后端获取的动态路由-----', res.data.data);
          console.log('前端的路由-------------', menu);
          //比较前后端的路由文件，筛选出符合后端路由规则的前端路由
          let menus = rulesMenu(menu, res.data.data)
          // console.log(menus);
          // //获取其最基本的路由
          // console.log(baseRouter);

          //合并路由导航
          let routes = baseRouter[0].children//获取了layout布局里的childen =[{home}]
          //添加动态回去匹配好的路由
          routes.push(...menus)
          console.log(routes);
          //解决_ob_ object
          routes = JSON.parse(JSON.stringify(routes))
          console.log(baseRouter);
          //存入vuex库
          commit('setMenuList', routes)

          // //合并路由
          // /*
          //   router.addRoutes  已废弃但是在vue2中还可以使用
          //   可用router.addRoute() 代替
          //   动态添加路由规则，参数必须是一个符合routes选项要求的数据

          // */
          // router.options.routes.push(...baseRouter)
          // router.addRoutes(baseRouter)
          // console.log(router);
          resolve(baseRouter)
        })
      })

    }
  }
};