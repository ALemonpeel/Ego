import Vue from 'vue'
import Vuex from 'vuex'
import Goods from './modules/Goods.js'
import Login from './modules/Login.js'
import Menu from './modules/Menu.js'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Goods,
    Login,
    Menu
  },
  plugins: [createPersistedState({
    key: 'Goods',
    paths: ['Goods', 'Login',]
  })]
})
