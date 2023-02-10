//国际化
import Vue from 'vue';
import VueI18n from 'vue-i18n'
//导入element-ui语言包
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
//配置语言
const messages = {
  myen: {
    //英文的语言
    home: {
      totalmoney: 'gross sale',
      totalviews: 'totalviews'
    },
    ...enLocale,

  },
  //中文环境
  myzh: {
    home: {
      totalmoney: '总销售额',
      totalviews: '总访问量'
    },
    ...zhLocale,
  }
}

//设置语言
const i18n = new VueI18n({
  locale: 'myzh',//设置地区
  messages,//设置地区信息

})
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});


//导出i18n
export default i18n