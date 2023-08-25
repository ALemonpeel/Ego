//请求接口的配置
//npm run serve 时将base中的http://127.0.0.1:9898改为api
const base = {
  host: 'http://127.0.0.1:9898',
  homeCount: 'http://127.0.0.1:9898/home/dataCount',//首页的数据统计接口
  homeFormat: 'http://127.0.0.1:9898/home/format',//首页折线图
  homeOrder: 'http://127.0.0.1:9898/home/orderinfo',//首页今日订单
  //产品管理接口
  goodsList: 'http://127.0.0.1:9898/goods/projectList',//商品列表接口
  goodsSearch: 'http://127.0.0.1:9898/goods/search',//商品查询接口
  goodsDelete: 'http://127.0.0.1:9898/goods/deleteItemById',//删除商品接口
  goodsClass: 'http://127.0.0.1:9898/goods/itemCategory/selectItemCategoryByParentId', //获取类目的接口
  addGoods: 'http://127.0.0.1:9898/goods/item/insertTbItem',//添加商品的接口
  updateTbItem: 'http://127.0.0.1:9898/goods/item/updateTbItem',//更改商品的接口
  batchDelete: 'http://127.0.0.1:9898/goods/batchDelete',//批量删除的接口
  //订单列表接口
  orderList: 'http://127.0.0.1:9898/order/list',  //订单列表的接口
  changeStatus: 'http://127.0.0.1:9898/order/changeStatus', //订单汇总接口
  detail: 'http://127.0.0.1:9898/order/list/detail',//订单详情接口
  collect: 'http://127.0.0.1:9898/order/collect', //汇总订单列表接口
  cancel: 'http://127.0.0.1:9898/order/cancel', //撤销汇总的接口
  //类目管理
  itemCategory: 'http://127.0.0.1:9898/itemCategory',//获取所有类目
  insertCategory: 'http://127.0.0.1:9898/itemCategory/insertCategory',//新增一级类目
  updateCategory: 'http://127.0.0.1:9898/itemCategory/updateCategory', //修改类目名称
  deleteContentCategoryById: 'http://127.0.0.1:9898/content/deleteContentCategoryById',//删除类目
  insertItemCategory: 'http://127.0.0.1:9898/itemCategory/insertItemCategory', //添加子类目

  //登录的接口
  login: 'http://127.0.0.1:9898/login',   //登录接口
  permission: 'http://127.0.0.1:9898/permission' //用户权限数据接口
}
//导出单个文件
export const host = 'http://127.0.0.1:9898/'

//导出图片地址
export const upload = '/api/upload'

export default base