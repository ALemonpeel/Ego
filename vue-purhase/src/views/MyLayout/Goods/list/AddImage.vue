<template>
  <div class="awd">
    <!-- 
      on-success	文件上传成功时的钩子
      on-preview	点击文件列表中已上传的文件时的钩子
      on-remove	文件列表移除文件时的钩子
    -->
    <el-upload :action="url" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
      :on-success="handleSuccess" ref="opload" :limit="2" :on-exceed="handleExceed" :file-list="fileList">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { upload, host } from '@/api/base'
export default {
  props: {
    fileList: {
      type: Array,
      defaule: function () {
        return []
      }
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      url: upload,
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    //文件超出限制的钩子函数
    handleExceed(file, fileList) {
      //console.log(file, fileList);
      this.$message({
        message: '最多上传两张图片',
        type: 'warning'
      });
    },
    //上传成功的函数
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      // this.fileList = fileList
      //获取一个完整的后台地址 --后台需要
      let url = response.url.slice(7)
      let imgurl = host + url
      this.$emit('getImgurl', imgurl)
    },
    //手动上传服务器
    // addImage() {
    //   this.$refs.upload.submit();
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}

</script>

<style lang='less' scoped>
.awd {
  display: flex;
}
</style>
