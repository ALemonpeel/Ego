<template>
  <div class="collect">
    <Breadcrumb></Breadcrumb>
    <div class="shenhequ">
      <div>
        订单合同：
        <el-button @click="look">查看合同</el-button>
      </div>
    </div>
    <Pdf></Pdf>
  </div>
</template>

<script>
import Pdf from './vuepdf.vue'
export default {
  data() {
    return {

    }
  },

  methods: {
    look() {

    }
  },
  components: {
    Pdf,
  }
};
</script>

<style lang='less' scoped>
.collect {
  padding: 20px;

  .shenhequ {
    background-color: rgb(233, 233, 231);
    margin-top: 20px;
    padding: 20px;
  }
}
</style>
