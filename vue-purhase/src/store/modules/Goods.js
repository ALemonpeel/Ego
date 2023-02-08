export default {
  namespaced: true,
  state: {
    Title: '添加',
    goodsData: {}
  },
  mutations: {
    ChangeTitle(state, payload) {
      state.Title = payload
    },
    ChangeGoods(state, payload) {
      state.goodsData = payload
    }
  }
}