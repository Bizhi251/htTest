<template>
  <a-form>
    <a-form-item>
      <a-input placeholder='请输入分类名称'/>
    </a-form-item>
  </a-form>
</template>
<script>
import {
  Form,
  Input
} from 'ant-design-vue'
export default {
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input
  }
}
</script>
<style lang="less" rel="stylesheet/less">

</style>
