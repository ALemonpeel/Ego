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
  },
  //订单详情接口
  detail() {
    return axios.get(base.detail)
  },
  //汇总订单列表接口
  collect(params) {
    return axios.get(base.collect, { params })
  },
  cancel(params) {
    return axios.get(base.cancel, { params })

  },
  //获取所有类目
  itemCategory() {
    return axios.get(base.itemCategory)
  },
  //新增以及类目
  insertCategory(params) {
    return axios.get(base.insertCategory, { params })
  },
  //修改类目名称
  updateCategory(params) {
    return axios.get(base.updateCategory, { params })
  },
  //删除类目
  deleteContentCategoryById(params) {
    return axios.get(base.deleteContentCategoryById, { params })
  },
  //添加子类目
  insertItemCategory(params) {
    return axios.get(base.insertItemCategory, { params })
  },
  //登录接口
  Login(params) {
    return axios.post(base.login, params)
  },
  //权限数据接口
}
export function permission(params) {
  return axios.get(base.permission, { params })
}
export default api