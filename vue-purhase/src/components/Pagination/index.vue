<template>
  <!--el-pagination 当前选中的页码  -->
  <div class="block">
    <el-pagination @current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
      :total="total" @current-change="getpage">
    </el-pagination>
  </div>
</template>

<script>


export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    getpage(val) {
      this.$emit('getpagination', val)
    }
  }
}

</script>

<style lang='less' scoped>
.block {
  text-align: right;
}
</style>
