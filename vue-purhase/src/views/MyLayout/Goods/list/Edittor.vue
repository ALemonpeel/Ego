<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 300px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="onCreated" @onChange="onChange" />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  name: 'Edittor',
  components: { Editor, Toolbar },
  props: {
    eaitorData: {
      type: String,
      defaule: ''
    }
  },
  watch: {
    eaitorData(val) {
      console.log('----------', val);
      this.$nextTick(() => {
        this.html = val
      })

    }
  },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {
        excludeKeys: [
          'headerSelect', 'blockquote', '|', 'bold', 'underline', 'group-justify'
        ]
      },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(editor) {
      //将数据发往AddGoods组件
      this.$emit('sendEditor', this.html)
    },
    // onBlur() {
    //   this.$emit('sendEditor', this.html)
    // },

  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css">

</style>

<style lang='less' scoped>

</style>
