<template>
  <div class="orderdesc">
    <div class="Breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tableline">
      <div class="header">
        <el-form :inline="true" class="demo-form-inline" strip="true">
          <el-form-item label="订单编号">
            <el-input placeholder="订单编号" v-model="formyin.code"></el-input>
          </el-form-item>
          <el-form-item label="下单人">
            <el-input placeholder="下单人" v-model="formyin.shenhename
            "></el-input>
          </el-form-item>
          <el-form-item label="所属单位">
            <el-input placeholder="所属单位" v-model="formyin.suggestion"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input placeholder="联系电话" v-model="formyin.created"></el-input>
          </el-form-item>
          <el-form-item label="预定时间">
            <el-input placeholder="预定时间" v-model="formyin.yudingTime"></el-input>
          </el-form-item>
          <el-form-item label="汇总状态">
            <el-input placeholder="汇总状态" v-model="pass"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="formyin.list" border style="width: 100%">
          <el-table-column prop="title" label="产品名称" width="260">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="260">
          </el-table-column>
          <el-table-column prop="guige" label="规格" width="260">
          </el-table-column>
          <el-table-column prop="num" label="数量" width="260">
          </el-table-column>
          <el-table-column prop="sum" label="小计(元)">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formyin: {},
      //汇总状态
      pass: '',
    }
  },
  methods: {
    //调用接口获取订单详情数据
    async detail() {
      let res = await this.$api.detail()
      console.log(res.data);
      this.formyin = res.data.result
      let pass = res.data.result.pass
      if (pass) {
        this.pass = '已汇总'
      } else {
        this.pass = '未汇总'
      }
    }
  },
  created() {
    this.detail()
  }

}

</script>

<style lang='less' scoped>
.orderdesc {
  margin: 10px 20px;

  .Breadcrumb {
    margin: 20px 0;
  }
}
</style>
