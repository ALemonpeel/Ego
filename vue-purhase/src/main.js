import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//css初始化
import '@/assets/css/iconfont.css'
//iconfont
import '@/assets/css/reset.css'

//挂在网络请求的配置方法
import api from './api'
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
