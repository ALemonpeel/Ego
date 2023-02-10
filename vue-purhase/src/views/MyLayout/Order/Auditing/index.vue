<template>
  <div class="list">
    <Breadcrumb></Breadcrumb>
    <!-- 列表展示 -->
    <div class="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" strip="true">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 订单列表按钮 -->
    <div class="btn">
      <el-row>
        <el-button type="success" size="mini">导出</el-button>
      </el-row>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%"> <!-- @selection-change="selectChange" -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="orderNum" label="订单编号" width="200">
          <template slot-scope="scope">
            <span @click="goxiangqing(scope.row)" style="color: blue; cursor: pointer;">{{ scope.row.orderNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="汇总人" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="180">
        </el-table-column>
        <el-table-column prop="time" label="预定时间" width="180">
          <template slot-scope="scope">
            {{ dayjs(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="订单总价格" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="colseCollect(scope.row.id)">撤销汇总</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :pageSize="pageSize" :total="total" @getpagination="getpagination"></Pagination>
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
        user: '',
        region: ''
      },
      //表数据
      tableData: [],
      //页码
      pageSize: 1,
      //页数
      total: 100,
      //选中的id
      selectIds: [],
      //固定汇总后的页码
      currentPage: 1,
    }
  },
  created() {
    this.getOrderList(1)
  },
  methods: {
    dayjs,
    //撤销汇总
    colseCollect(id) {
      this.$confirm('此操作将撤销该汇总, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用cancel完成撤销
        this.cancel(id)
        this.getOrderList(1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤销'
        });
      });
    },
    //点击进入订单详情
    goxiangqing() {

    },
    //选择table
    selectChange(row) {
      console.log(row);
      let arr = []
      row.forEach(element => {
        arr.push(element.id)
      });
      console.log(arr);
      this.selectIds = arr
    },
    //获取订单列表的数据
    async getOrderList(page) {
      let res = await this.$api.collect({ page })
      console.log(res.data);
      if (res.data.status === 200) {
        this.tableData = res.data.data
        this.pageSize = res.data.pageSize
        this.total = res.data.total
      }
    },
    //撤销汇总的接口调用
    async cancel(id) {
      let res = await this.$api.cancel({ id })
      if (res.data.status === 200) {

        this.$message({
          message: '撤销成功',
          type: 'success'
        });
      } else {
        this.$message.error('撤销失败');
      }
    },
    //分页
    getpagination(page) {
      this.currentPage = page
      if (this.searchStatus) {
        //未点击查询按钮
        this.tableline = this.listTotal.slice((page - 1) * 8, page * 8)
        return;
      }
      this.getOrderList(page)

    },
  },
  components: {
    Pagination,

  }
};
</script>

<style lang='less' scoped>
.list {
  margin: 10px;
  background-color: #fff;
  padding: 20px;

  .header {
    margin-top: 20px;
  }

  .btn {
    margin-bottom: 10px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
