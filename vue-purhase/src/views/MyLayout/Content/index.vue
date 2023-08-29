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
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ internationalization }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myzh">中文</el-dropdown-item>
            <el-dropdown-item command="myen">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="fenge">|</span>
        <span>欢迎 {{ userinfo.user }}</span>
        <span class="fenge">|</span>
        <span class="exit" @click="signout">
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
import { mapState } from 'vuex';
export default {
  props: ['isCollapse'],
  data() {
    return {
      nowTime: '',
      //国际化名称
      internationalization: '国际化',
      user: ''
    }
  },
  methods: {
    //展示或折叠左侧导航区域
    changemenu() {
      this.$emit('changeMenu')
    },
    //国际化
    handleCommand(command) {
      this.$i18n.locale = command
      if (command === 'myzh') {
        this.internationalization = '中文'
      } else if (command === 'myen') {
        this.internationalization = 'English'
      }
    },
    //退出登录
    ...mapState('Login', ['deleteUser']),
    ...mapState('Menu', ['deleteMenuList']),
    signout() {
      console.log();
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //清空储存的菜单数据和登录信息
        localStorage.removeItem('Goods')
        this.deleteUser()
        this.deleteMenuList()
        // window.location.href = 'https://58kr325790.zicp.fun/';
        this.$router.replace('/login');
        this.$message({
          type: 'success',
          message: '已退出'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });


    },
  },
  computed: {
    //获取用户名
    ...mapState('Login', ['userinfo']),
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

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
