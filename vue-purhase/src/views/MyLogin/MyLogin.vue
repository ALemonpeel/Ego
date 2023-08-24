<template>
  <div class="login_container">
    <div class="login_box">
      <div class="ava_box">
        <img src="@/assets/login.webp" />
      </div>
      <!-- 账号 -->
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :show-password="true" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="Login(loginForm.username, loginForm.password)" round>登录</el-button>
          <el-button type="info" @click="resetLoginForm" round>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>账号或密码错误请重新输入</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      // 表单数据绑定
      loginForm: {
        username: "",
        password: ""
      },
      // 检验规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 0, max: 12, message: "长度在 0 到 12 个字符", trigger: "blur" }
        ]

      },
      dialogVisible: false,
    }
  },
  methods: {
    resetLoginForm() {
      this.loginForm.username = ''
      this.loginForm.password = ''
    },
    //登录
    ...mapMutations('Login', ['setUser']),
    async Login(user, pwd) {
      if (this.loginForm.username != '' && this.loginForm.password != '') {
        let res = await this.$api.Login({ user, pwd })
        if (res.data.status === 200) {
          let obj = {
            user,
            token: res.data.token
          }
          //存储到仓库
          // console.log(obj);
          this.setUser(obj);
          //跳转网页
          this.$router.push('/')
        } else if (res.data.status === 400) {
          this.dialogVisible = true
        }
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  // 横轴，纵轴
  transform: translate(-50%, -50%);

  .ava_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;

  }

  .login_form {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

  }
}
</style>