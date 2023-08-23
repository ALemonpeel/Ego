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

      <el-button type="primary" size="mini" @click="orderCollect">订单汇总</el-button>

      <download-excel class="export-excel-wrapper" :data="DetailsForm" :fields="json_fields" :header="title"
        :name="title">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="success" size="mini" class="daochu" @click="download">导出</el-button>
      </download-excel>

    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" @selection-change="selectChange">

        <el-table-column type="selection" width="55" :selectable="selectFun">
        </el-table-column>
        <el-table-column prop="code" label="订单编号" width="200">
          <template slot-scope="scope">
            <span @click="goxiangqing(scope.row)" style="color: blue; cursor: pointer;">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ordername" label="下单人" width="100">
        </el-table-column>
        <el-table-column prop="company" label="所属单位" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="180">
        </el-table-column>
        <el-table-column prop="yudingTime" label="预定时间" width="180">
          <template slot-scope="scope">
            {{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="订单价格" width="100">
        </el-table-column>
        <el-table-column label="汇总状态">
          <template slot-scope="scope">
            <span v-show="scope.row.huizongStatus === 2">已汇总</span>
            <span v-show="scope.row.huizongStatus === 1">未汇总</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :pageSize="pageSize" :total="total" @getpagination="getpagination"></Pagination>
    </div>
    <!-- 抽屉 显示订单详情 -->
    <div class="drawer">
      <el-drawer title="订单详情" :visible.sync="drawer" :direction="direction" size="87%">
        <OrderDes></OrderDes>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Pagination from '@/components/Pagination'
import OrderDes from './orderDes.vue'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      //配置表头字段文字
      json_fields: {
        "订单编号": {
          field: "code",
          callback: value => {
            return '&nbsp;' + value
          }
        },
        "下单人": "ordername",
        "所属单位": "company",
        "联系电话": {
          field: 'phone',
          callback: value => {
            return '&nbsp;' + value
          }
        },
        "预定时间": "yudingTime",
        "订单价格": "price",
        "汇总状态": "huizongStatus"
      },
      //需要导出的数据
      DetailsForm: [],
      //导出的表格名称
      title: '首客生鲜订单列表',
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
      //抽屉的方向 和是否打开
      drawer: false,
      direction: 'rtl',

    }
  },
  created() {
    this.getOrderList(1)
  },
  methods: {
    dayjs,
    download() {
      let arr = [...this.tableData]
      arr.forEach(ele => {
        ele.yudingTime = dayjs(ele.yudingTime).format('YYYY-MM-DD HH:mm:ss')
        ele.huizongStatus = ele.huizongStatus == '已汇总' ? 1 : 2
      })
      this.DetailsForm = arr
    },
    //点击进入订单详情
    goxiangqing(val) {
      this.drawer = !this.drawer
    },
    //禁用已汇总的选项框
    selectFun(row, index) {
      if (row.huizongStatus === 1) {
        return true
      } else {
        return false
      }
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
    //订单汇总
    orderCollect() {
      this.$confirm('是否需要提交所选内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selectIds.join(',')
        this.changeStatus(ids)
        // this.$message({
        //   type: 'success',
        //   message: '提交成功!'
        // });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '放弃提交汇总'
        });
      });
    },
    //订单汇总
    async changeStatus(ids) {
      let res = await this.$api.changeStatus({ ids })
      if (res.data.status === 200) {
        console.log(this.currentPage);
        this.getOrderList(this.currentPage)
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.getOrderList(1)
      }
    },
    //获取订单列表的数据
    async getOrderList(page) {
      let res = await this.$api.orderList({ page })
      console.log(res.data);
      if (res.data.status === 200) {
        this.tableData = res.data.data
        this.pageSize = res.data.pageSize
        this.total = res.data.total
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
    OrderDes
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
    display: flex;

    .daochu {
      margin-left: 10px;
    }
  }
}
</style>
