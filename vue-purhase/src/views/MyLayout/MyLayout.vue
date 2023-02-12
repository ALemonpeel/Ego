<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <!-- 右侧内容区 -->
    <div class="content" :class="{ active: isCollapse }">
      <Content @changeMenu="changeMenu" :isCollapse="isCollapse"></Content>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';
import Content from './Content';
export default {
  name: 'MyLayout',
  components: {
    Menu,
    Content,
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeMenu() {
      this.isCollapse = !this.isCollapse
    }
  },
  destroyed() {
    this.$router.go(0)
  }


};
</script>

<style lang='less' scoped>
.layout {
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    // width: 200px;
    background-color: #112f50;
    transition: all 0.2s;
  }

  .content {
    margin-left: 200px;
    transition: all 0.5s;
  }

  .active {
    margin-left: 64px
  }
}
</style>
