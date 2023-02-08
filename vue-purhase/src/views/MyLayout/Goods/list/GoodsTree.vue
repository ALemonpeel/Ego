<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy @node-click="clickTree">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
    };
  },
  methods: {
    //点击了tree
    clickTree(data, node) {
      this.$emit('changeTree', data)
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {//进入页面自动加载
        let result = await this.getgoodsclass(1)
        return resolve(result);
      }
      if (node.level >= 1) {//点击tree 获取点击层级的级别 请对应的数据
        let result = await this.getgoodsclass(node.data.cid)
        //console.log(result);
        return resolve(result);
      }


    },
    //获取分类数据
    async getgoodsclass(type) {
      let res = await this.$api.getgoodsClass({ type })
      //console.log('tree----', res);
      if (res.data.status === 200) {
        return res.data.result
      } else {
        return []
      }
    }
  }
}

</script>

<style lang='less' scoped>

</style>
