<template>
  <div class="category">
    <Breadcrumb></Breadcrumb>
    <div class="wrapper">
      <div class="title">商品分类管理</div>
    </div>
    <el-button type="primary" @click="append()" plain>新增一级导航类目</el-button>
    <div class="mytree">
      <div class="custom-tree-container">
        <div class="block">
          <!-- 
           data    要展示的数据
           default-expand-all 是否展开所有    默认为展开  true
           expand-on-click-node="false"       是否再点击节点时展开或收缩节点 ， 默认值为 true   为false时只有点击箭头才可以展开或收缩  
           render-content  内容请渲染树的方法
           -->
          <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


let id = 1000;
export default {
  data() {
    return {
      data: [],
      //存储修改的名称
      modifyname: ''
    }
  },
  created() {
    this.itemCategory()

  },
  methods: {
    //新增的方法
    append() {
      this.$prompt('请输入类目名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        console.log(typeof value);
        this.insertCategory(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //删除的方法
    remove(node, data) {
      let id = data.id
      this.$confirm('此操作将删除该类目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteContentCategoryById(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });



    },
    //修改的方法
    modify(node, data) {
      let id = data.id
      this.$prompt('请输入类目名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.updateCategory(id, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });

    },
    //新增二级类目的方法
    appendchildren(data) {
      let id = data.cid
      this.$prompt('请输入类目名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.insertItemCategory(id, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });


    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{data.name}</span>
          {data.type == 1 ? <span>
            <el-button size="mini" type="text" on-click={() => this.appendchildren(data)}>新增</el-button>
            <el-button size="mini" type="text" on-click={() => this.modify(node, data)}>修改</el-button>
          </span> : <span>
            <el-button size="mini" type="text" on-click={() => this.modify(node, data)}>修改</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>删除</el-button>
          </span>
          }
        </span>);
    },
    //获取类目的方法
    async itemCategory() {
      let res = await this.$api.itemCategory()
      console.log(res.data.result);
      let resylt = res.data.result
      //声明容器存储以及导航和二级导航
      let arr = [], arr2 = []  //arr存储一级//arr2存储二级
      //处理接收到的数据
      resylt.forEach(ele => {
        if (ele.type === 1) {
          ele.children = []
          arr.push(ele)
        } else {
          arr2.push(ele)
        }
      });
      arr.forEach(ele => {
        arr2.forEach(ele2 => {
          if (ele.cid === ele2.type) {
            ele.children.push(ele2)
          }
        })
      })
      console.log(arr, arr2);
      this.data = arr
    },
    //调用新增类目接口
    async insertCategory(name) {
      let res = await this.$api.insertCategory({ name })
      console.log(res.data);
      if (res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '增加类目成功'
        });
        this.itemCategory()
      }
    },
    //调用修改类目的接口
    async updateCategory(id, name) {
      let res = await this.$api.updateCategory({ id, name })
      console.log(res.data);
      if (res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.itemCategory()
      }
    },
    //调用删除的接口
    async deleteContentCategoryById(id) {
      let res = await this.$api.deleteContentCategoryById({ id })
      console.log(res.data);
      if (res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.itemCategory()
      }
    },
    //调用添加子类目的接口
    async insertItemCategory(cid, name) {
      let res = await this.$api.insertItemCategory({ cid, name })
      console.log(res.data);
      if (res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
        this.itemCategory()
      }
    }

  }
};
</script>

<style lang='less' scoped>
.category {
  margin: 10px;

  .wrapper {
    padding: 10px;
    margin-top: 10px;
    background: #fff;

    .title {
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      padding-left: 10px;
      background: #ece5e5;
    }

    .mytree {
      margin-top: 10px;
    }
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/deep/ .custom-tree-node {
  span:last-child {
    margin-left: 10px;
    font-size: 5px;
  }
}
</style>
