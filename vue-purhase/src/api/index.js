import base from './base'
import axios from '@/request/request'

const api = {
  //首页顶部数据统计
  getHomeCount() {
    return axios.get(base.homeCount)
  },
  //首页图标绘制
  getHomeFormat() {
    return axios.get(base.homeFormat)
  },
  //每日订单数据
  getHomeOrder() {
    return axios.get(base.homeOrder)
  },
  //商品列表数据
  getGoodsList(params) {
    return axios.get(base.goodsList, { params })
  },
  //查询接口
  getgoodsSearch(params) {
    return axios.get(base.goodsSearch, { params })
  },
  //删除接口
  getgoodsDelete(params) {
    return axios.get(base.goodsDelete, { params })
  },
  //获取类目的接口
  getgoodsClass(params) {
    return axios.get(base.goodsClass, { params })
  },
  //添加商品的接口
  addGoods(params) {
    return axios.get(base.addGoods, { params })
  },
  //修改商品的接口
  updateTbItem(params) {
    return axios.get(base.updateTbItem, { params })
  },
  //批量删除商品的接口
  batchDelete(params) {
    return axios.get(base.batchDelete, { params })
  },
  //订单列表的接口
  orderList(params) {
    return axios.get(base.orderList, { params })
  },
  //订单汇总接口
  changeStatus(params) {
    return axios.get(base.changeStatus, { params })
  }
}

export default api