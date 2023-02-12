<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import MyLayout from '@/views/MyLayout/MyLayout.vue';
import MyLogin from '@/views/MyLogin/MyLogin.vue';

export default {
  name: 'app',
  components: {
    MyLayout,
    MyLogin,
  },
};
</script>

<style lang="less" scoped>

</style>
