<template>
  <!-- 
    el-menu 下拉菜单
      background-color 背景颜色
      text-color       文字颜色
      active-text-color高亮文字颜色
      router           启动路由模式
      collapse         是否水平折叠菜单（仅在mode为vertival时可用） boolean -false
    el-submenu  下拉导航内容
       index="1"       导航标识 路由路径
    el-menu-item-group 分组 
    el-menu-item       导航的每一项内容

   -->
  <el-menu :default-active="$route.name" class="el-menu-vertical-demo" background-color="#112f50" text-color="#fff"
    active-text-color="#ffd04b" :collapse="isCollapse">
    <el-menu-item>
      <span>Ego后台管理系统</span>
    </el-menu-item>
    <Menuitem :menulist="dyMenuList">
    </Menuitem>
    <!-- <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">系统首页</span>
    </el-menu-item>
    <el-submenu index="/goods">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">产品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/goods/list">产品列表</el-menu-item>
        <el-menu-item index="/goods/category">产品分类</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/order">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/order/orderlist">订单列表</el-menu-item>
        <el-menu-item index="/order/auditing">汇总清单</el-menu-item>
        <el-menu-item index="/order/collect">订单审核</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/advert">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">广告管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/advert/advertlist">广告列表</el-menu-item>
        <el-menu-item index="1-2" disabled>分类管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/management">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/management/role">角色管理</el-menu-item>
        <el-menu-item index="/management/department">部门管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
  </el-menu>

</template>

<script>
import Menuitem from './Menuitem.vue'
import { mapState } from 'vuex';
export default {
  props: ['isCollapse'],
  data() {
    return {
      //动态渲染菜单
      menu: []
    }
  },
  methods: {
    // activeMenu() {
    //   let route = this.$route;
    //   console.log(route);
    //   if (route.meta) {
    //     return route.meta.activeMenu
    //   }
    //   return route.path
    // }
  },
  computed: {
    ...mapState('Menu', ['dyMenuList'])
  },
  mounted() {
    console.log('dy --------------------', this.dyMenuList);
  },
  components: {
    Menuitem
  }
};
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border: none;
}

.el-menu .is-active {
  background-color: #1e78df !important;
  color: #fff !important;
}
</style>
