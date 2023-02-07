<template>
  <div class="addgoods">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="menu">
          <div class="title">
            产品类型列表
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="subtitle">
            添加商品
          </div>
          <div class="table">
            <!--
              ruleForm   存储用户输入的数据
              :rules="rules" 校验规则
              ref="ruleForm" 获取from组件
              -->
            <el-form :model="GoodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="所属分类" prop="category">
                <span> {{ GoodsForm.category }}</span>
              </el-form-item>
              <el-form-item label="商品图片" prop="image">
                <el-button type="primary">上传图片</el-button>
              </el-form-item>
              <el-form-item label="商品名称" prop="title">
                <el-input v-model="GoodsForm.title"></el-input>
              </el-form-item>

              <el-form-item label="商品买点" prop="sellPoint">
                <el-input v-model="GoodsForm.sellPoint"></el-input>
              </el-form-item>

              <el-form-item label="发布时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="GoodsForm.date1"
                      style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="GoodsForm.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-row>
                <el-col :span="7">
                  <el-form-item label="商品价格" prop="price">
                    <el-input v-model="GoodsForm.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="商品数量" prop="num">
                    <el-input v-model="GoodsForm.num"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="商品规格" prop="category">
                    <el-input v-model="GoodsForm.category"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="商品描述" prop="descs">
                文本编辑器
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      GoodsForm: {
        category: '',//分类
        title: '',
        price: '',
        category: '',
        num: '',
        sellPoint: '',
        image: '',
        descs: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请输入商品的规格', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>

<style lang='less' scoped>
.addgoods {
  margin: 10px;
  padding: 10px;
}

.menu {
  border: 1px solid #ddd;
  height: 600px;

  .title {
    height: 50px;
    line-height: 50px;
    background-color: rgb(74, 231, 236);
    color: #fff;
    padding-left: 10px;
    font-size: 14px;

  }
}

.content {
  height: 600px;
  background-color: #fff;
  font-size: 14px;

  .subtitle {
    background-color: #eee;
    color: #333;
    padding: 10px;
    font-weight: bold;
  }

  .table {
    margin: 10px;
    padding: 10px;
  }
}
</style>
