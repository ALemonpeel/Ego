<template>
  <div>
    <!-- 
   导航信息
   [{home},{goods:,childen:[{},{},{}]},{order:,childen:[{},{},{}]}]
   1.遍历获取导航的路由信息
   2.渲染的时候要判断当前的路径是否有子元素
   有children 长度大于0
   没有children 只有以及
     -->
    <template v-for="(item, index) in menulist">
      <el-submenu :index="item.name" :key="index" v-if="item.children && item.children.length > 0">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <!--  
          渲染二级导航，不需要循环遍历
          注意 递归组件
        -->
        <el-menu-item-group>
          <menulist :menulist="item.children"></menulist>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item :index="item.name" :key="index" @click="tiao(item.name)" v-show="!item.meta.isShow" v-else>
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
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
  </div>
</template>

<script>
export default {
  name: 'menulist',
  props: ['menulist'],
  mounted() {
    console.log('接收--------------------', this.menulist);
  },
  methods: {
    tiao(val) {
      this.$router.push({ name: val })
    }
  }
}

</script>

<style lang='less' scoped>
.el-menu .is-active {
  background-color: #1e78df !important;
  color: #fff !important;
}
</style>
