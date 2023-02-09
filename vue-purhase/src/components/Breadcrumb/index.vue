<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in navData" :key="item.path" :to="{ path: item.path }">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    console.log(this.$route.matched);
  },
  computed: {
    navData() {
      let matcheds = this.$route.matched
      console.log(matcheds);
      matcheds[0].path = '/'
      return matcheds;
    }
  }
}

</script>

<style lang='less' scoped>

</style>
