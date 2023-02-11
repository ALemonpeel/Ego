import Vue from 'vue'
import App from './App.vue'
import router from './router'
import _ from 'lodash'
import './router/router-permission'
import store from './store'
import './plugins/element.js'
//css初始化
import '@/assets/css/iconfont.css'
//iconfont
import '@/assets/css/reset.css'
//导入normalize.css
import 'normalize.css'
//导入echarts
// import echarts from './plugins/echarts'
// Vue.use(echarts)
//挂在网络请求的配置方法
import api from './api'
Vue.prototype.$api = api
//将Breadcrumb注册为全局组件
import Breadcrumb from '@/components/Breadcrumb'
//导入JsonExcel
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
Vue.component('Breadcrumb', Breadcrumb)
//导入vue-i18n配置文件
import i18n from './lang/index'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
