<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div style="min-width: 350px">
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)" >
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import Quill from 'quill'
// import { someModule } from '../yourModulePath/someQuillModule.js'
// Quill.register('modules/someModule', someModule)

export default {
  data () {
    return {
      content: this.detail,
      editorOption: {
        // some quill options
      }
    }
  },
  props: {
    detail: String
  },
  // mounted () {
  //   console.log(this.detail)
  // },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    getDetail () {
      // console.log(this.content)
      return this.content
    },
    onEditorBlur (quill) { // 失去焦点
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) { // 获得聚焦
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) { // 准备编机器
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) { // 内容改变
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  // mounted () {
  //   console.log('this is current quill instance object', this.editor)
  // },
  components: {
    quillEditor
  }
}
</script>
<style lang="less" rel="stylesheet/less">
</style>
