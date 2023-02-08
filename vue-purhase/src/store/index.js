import Vue from 'vue'
import Vuex from 'vuex'
import Goods from './modules/Goods.js'

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
    Goods
  },
  plugins: [createPersistedState({
    key: 'Goods',
    paths: ['Goods']
  })]
})
