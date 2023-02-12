import router, { baseRouter } from './index'
import store from '@/store/index.js'
//导航全局前置守卫

router.beforeEach((to, from, next) => {
  console.log('to --------------', to);
  //判断是否需要登录
  if (to.matched.length && !to.matched.some(item => item.meta.isLogin)) { //不需要登录
    next()
  } else {
    //需要登录
    //是否已经登录了  根据token
    let token = store.state.Login.userinfo.token;
    // console.log(store.state.Login.userinfo.token);
    if (token) {
      //判断是否有导航存储
      if (store.state.Menu.dyMenuList != 0) {
        next()
      } else {
        //没有导航
        store.dispatch('Menu/getMenuList').then(baseRouter => {
          router.options.routes.push(...baseRouter)
          router.addRoutes(baseRouter)
          //next({...to,replace:true}) 中断当前的导航 执行新的导航

          next({ ...to, replace: true })
        })

      }
    } else {
      next('/login')
    }
  }
})