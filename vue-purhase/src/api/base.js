//请求接口的配置
const base = {
  host: 'http://127.0.0.1:9898',
  homeCount: '/api/home/dataCount',//首页的数据统计接口
  homeFormat: '/api/home/format',//首页折线图
  homeOrder: '/api/home/orderinfo',//首页今日订单
  //产品管理接口
  goodsList: '/api/goods/projectList',//商品列表接口
  goodsSearch: '/api/goods/search',//商品查询接口
  goodsDelete: '/api/goods/deleteItemById',//删除商品接口
  goodsClass: '/api/goods/itemCategory/selectItemCategoryByParentId', //获取类目的接口
  addGoods: '/api/goods/item/insertTbItem',//添加商品的接口
  updateTbItem: '/api/goods/item/updateTbItem',//更改商品的接口
  batchDelete: '/api/goods/batchDelete',//批量删除的接口
  //订单列表接口
  orderList: '/api/order/list',  //订单列表的接口
  changeStatus: '/api/order/changeStatus' //订单汇总接口

}
//导出单个文件
export const host = 'http://127.0.0.1:9898/'

//导出图片地址
export const upload = '/api/upload'

export default base