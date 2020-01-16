<template>
  <a-form :form="form">
    <a-form-item>
      <a-input v-decorator="[
          'categoryName',
          { rules: [{ required: true, message: '分类名称必须输入' }], initialValue: categoryName},
        ]" placeholder='请输入分类名称'/>
    </a-form-item>
  </a-form>
</template>
<script>
import {
  Form,
  Input
} from 'ant-design-vue'
export default {
  beforeMount () {
    console.log('setFoem: ' + this.setForm)
    this.setForm(this.form)
  },
  props: {
    setForm: Function,
    categoryName: String
  },
  created () {
    this.form = this.$form.createForm(this, {
      name: 'global_state',
      onFieldsChange: (_, changedFields) => {
        this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {
          categoryName: this.$form.createFormField({
            ...this.categoryName
          })
        }
      },
      onValuesChange (_, values) {
        console.log('初始化回调： ' + values)
      }
    })
  },
  watch: {
    categoryName () {
      this.form.updateFields({
        categoryName: this.$form.createFormField({
          ...this.categoryName
        })
      })
    }
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input
  }
}
</script>
<style lang="less" rel="stylesheet/less">

</style>
