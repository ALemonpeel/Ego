<template>
  <div class="addgoods">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="menu">
          <div class="title">
            产品类型列表
          </div>
          <GoodsTree @changeTree="changeTree"></GoodsTree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="subtitle">
            {{ Title }}商品
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

              <el-form-item label="商品名称" prop="title">
                <el-input v-model="GoodsForm.title"></el-input>
              </el-form-item>

              <el-form-item label="商品买点" prop="sellPoint">
                <el-input v-model="GoodsForm.sellPoint"></el-input>
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
              </el-row>
              <el-form-item label="商品描述" prop="descs">
                <Edittor @sendEditor="sendEditor" :eaitorData="eaitor"></Edittor>
              </el-form-item>
              <el-form-item label="商品图片" prop="image">
                <AddImage @getImgurl="getImgurl" :fileList="fileList"></AddImage>
              </el-form-item>
              <div class="option">
                <el-form-item label="首页轮播推荐" prop="isBanner" class="on-option">
                  <el-Switch v-model="GoodsForm.isBanner"></el-Switch>
                </el-form-item>
                <el-form-item label="是否推荐商品" prop="recommemd" class="on-option">
                  <el-Switch v-model="GoodsForm.recommemd"></el-Switch>
                </el-form-item>
                <el-form-item label="是否上架商品" prop="shelves" class="on-option">
                  <el-Switch v-model="GoodsForm.shelves"></el-Switch>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
//导入需要的组件
import GoodsTree from './GoodsTree.vue';//tree组件
import AddImage from './AddImage.vue';//上传图片的组件
import Edittor from './Edittor.vue';//文本编辑器
import { mapState } from 'vuex';
export default {
  components: {
    GoodsTree,
    AddImage,
    Edittor,
  },
  //从仓库中获取数据
  computed: {
    ...mapState('Goods', ['Title', 'goodsData'])

  },
  //
  mounted() {
    if (this.Title === '编辑') {
      //获取仓库中的行数据
      //处理图片 ------------------------------
      this.GoodsForm = this.goodsData
      console.log(this.goodsData);
      let images = JSON.parse(this.goodsData.image)
      this.GoodsForm.image = images//获取vuex里面的数组 转成数组的语法
      console.log(images);
      let arr = []
      images.forEach(ele => {
        let obj = {}
        obj.url = ele
        arr.push(obj)
      });
      this.fileList = arr
      //获取富文本编辑数据------------------------------------
      this.eaitor = this.goodsData.descs

    }

  },
  data() {
    return {
      fileList: [],//图片容器
      eaitor: '',//富文本编辑器内容容器
      GoodsForm: {
        id: '',
        cid: '',
        category: "",
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: [],
        descs: "",
        isBanner: true,
        recommemd: true,
        shelves: true
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" }
        ],
        num: [
          { required: true, message: "请输入数量", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请输入商品的规格", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    //接收AddImage发来的图片地址信息
    getImgurl(val) {
      console.log(val);
      this.GoodsForm.image.push(val)
    },
    //接收Edittor发来的数据
    sendEditor(val) {
      console.log(val);
      this.GoodsForm.descs = val
    },
    //接收GoodsTree发来的数据
    changeTree(val) {
      console.log(val);
      this.GoodsForm.category = val.name
      this.GoodsForm.cid = val.cid
    },
    //提交--------------------------------
    submitForm(formName) {
      //添加-------------
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('获取表单的信息', this.GoodsForm);
          //添加商品 -参数 title cid  category sellPoint price num descs paramsInfo image
          let { title, cid, category, sellPoint, price, num, descs, paramsInfo, image } = this.GoodsForm
          if (this.Title === '添加') {
            this.$api.addGoods({
              title, cid, category, sellPoint, price, num, descs, image: JSON.stringify(image)
            }).then(res => {
              //console.log('添加成功', res.data);
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push('/goods/list')
              } else {
                this.$message.error('添加失败');
              }

            })
          } else {
            //修改---------------在添加参数基础上增加了一个参数 id--------------------------------------
            console.log('修改商品');

            let { id, title, cid, category, sellPoint, price, num, descs, paramsInfo, image } = this.GoodsForm
            this.$api.updateTbItem({
              id, title, cid, category, sellPoint, price, num, descs, image: JSON.stringify(image)
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push('/goods/list')
              } else {
                this.$message.error('修改失败');
              }
            })
          }

        }
        else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
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
  min-height: 800px;
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

.option {
  display: flex;
  margin: 20px;

  .on-option {
    margin-right: 50px;
  }
}
</style>
