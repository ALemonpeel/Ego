<template>
  <div>
    <div class="lujing">首页 / 商品管理 / 商品列表</div>
    <!-- 搜索区域 -->
    <div class="header-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"
              v-model="formInline.time"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <el-button size="mini" type="warning" @click="addgoods">添加商品</el-button>
      <el-button size="mini" type="danger">批量删除</el-button>
    </div>
    <!-- 列表区域 -->
    <div class="list">
      <el-table :data="tableline" style="width: 100%" :border="true" class="table">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="id" label="产品编号" width="80">
        </el-table-column>
        <el-table-column prop="title" label="产品名称" width="80">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
        </el-table-column>
        <el-table-column prop="title" label="库存" width="80">
        </el-table-column>
        <el-table-column prop="category" label="规格/类目" width="150">
        </el-table-column>
        <el-table-column label="时间" width="200">
          <!-- prop获取字段标识  template 
               slot-scope="scope" 可以回去当前行的数据
          -->
          <template slot-scope="scope">
            {{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="paramsInfo" label="商品买点" width="150">
        </el-table-column>
        <el-table-column prop="sellpoint" label="商品描述" width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"><i
                class="iconfont icon-xiugai"></i> 编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i
                class="iconfont icon-shanchu2"></i> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div>
        <Pagination :pageSize="pageSize" :total="total" @getpagination="getpagination"> </Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Pagination from '@/components/Pagination'
export default {
  data() {
    return {
      formInline: {
        name: '',
        time: ''
      },
      //分页数据
      tableline: [],
      //分页信息
      pageSize: 1,
      total: 100,
      listTotal: [],
      //查询的状态
      searchStatus: false
    }
  },
  created() {
    //获取商品数据
    this.getGoodsList(1)
  },
  methods: {
    //把dayjs注册为方法
    dayjs,
    //添加商品
    addgoods() {
      this.$router.push('/goods/addgoods')
    },
    //获取页码
    getpagination(page) {
      if (this.searchStatus) {    //未点击查询按钮
        this.tableline = this.listTotal.slice((page - 1) * 8, page * 8)
        return;
      }
      this.getGoodsList(page)

    },
    //搜索查询
    onSubmit() {
      console.log('submit!', this.formInline.name);
      if (!this.formInline.name) {
        return this.$message.error('请输入要查询的内容');
      }
      this.$api.getgoodsSearch({ search: this.formInline.name }).then(res => {
        if (res.data.status === 200) {
          //获取所有的数据
          this.listTotal = res.data.result
          //渲染到页面
          if (this.listTotal.length > 8) {
            //修改分页状态
            this.searchStatus = !this.searchStatus
            this.tableline = this.listTotal.slice(0, 8)
          } else {
            this.tableline = this.listTotal
          }
          this.pageSize = 8
          this.total = res.data.result.length
        } else if (res.data.status === 500) {
          return this.$message.error(res.data.msg);
        }
      })
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      this.$api.getgoodsDelete({ id: row.id }).then(res => {
        if (res.data.status === 200) {
          this.getGoodsList(1)
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        } else {
          this.$message.error('删除失败');
        }
      })
    },
    //获取商品列表数据
    async getGoodsList(page) {
      let res = await this.$api.getGoodsList({ page })
      console.log(res);
      if (res.data.status === 200) {
        this.tableline = res.data.data
        this.pageSize = res.data.pageSize
        this.total = res.data.total
      }
    },

  },
  components: {
    Pagination
  }

};
</script>

<style lang='less' scoped>
.lujing {
  padding: 20px 20px;
}

.header-search {
  padding: 0 20px;
}

.btn {
  border: 2px solid rgba(128, 128, 128, 0.3);
  border-radius: 5px;
  margin: 10px 20px;
  padding: 10px 20px;
}

.list {
  padding: 10px 20px;

}
</style>
