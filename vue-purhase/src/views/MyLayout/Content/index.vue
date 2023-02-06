<template>
  <div>
    <!-- 顶部区域 -->
    <div class="header">
      <!-- 折叠图标 -->
      <div class="icon">
        <i class="iconfont icon-right-indent" @click="changemenu" v-if="!isCollapse"></i>
        <i class="iconfont icon-left-indent" @click="changemenu" v-else></i>
      </div>
      <!-- 登录信息 -->
      <div class="reight">
        <span>当前时间:{{ nowTime }}</span>
        <span class="fenge">|</span>
        <span>欢迎xxx</span>
        <span class="fenge">|</span>
        <span class="exit">
          <i class="iconfont icon-tuichu"></i>
        </span>
      </div>
    </div>
    <!-- 路由占位区 -->
    <router-view></router-view>
  </div>
</template>

<script>
//导入dayjs
import second from 'dayjs'
export default {
  props: ['isCollapse'],
  data() {
    return {
      nowTime: ''

    }
  },
  methods: {
    changemenu() {
      this.$emit('changeMenu')
    }
  },
  created() {
    //获取当前时间
    this.nowTime = second(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
  }
};
</script>

<style lang='less' scoped>
.header {
  background-color: #1e78bf;
  height: 50px;
  line-height: 50px;
  color: #fff;
  width: 100%;
  display: flex;

  .icon {
    i {
      font-size: 28px;
    }
  }

  .reight {
    flex: 1;
    text-align: right;
    padding-right: 5px;
    font-size: 12px;

    .fenge {
      font-size: 5px;
      padding: 0 10px;
      color: #999;
    }

    .exit {
      // background-color: #999;
      position: relative;
      top: 2px;
      padding-right: 10px;
    }

  }
}
</style>
