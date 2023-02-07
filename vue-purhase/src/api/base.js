//请求接口的配置
const base = {
  host: 'http://127.0.0.1:9898',
  homeCount: '/api/home/dataCount',//首页的数据统计接口
  homeFormat: '/api/home/format',//首页折线图
  homeOrder: '/api/home/orderinfo',//首页今日订单
  //产品管理接口
  goodsList: '/api/projectList',//商品列表接口
  goodsSearch: '/api/search',//商品查询接口
  goodsDelete: '/api/deleteItemById'//删除商品接口
}
//导出单个文件
export const host = 'http://127.0.0.1:9898/'



export default base