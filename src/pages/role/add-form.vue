<template>
  <a-form :form="form">
    <a-item label='角色名称'>
      <a-input placeholder='请输入角色名称' v-decorator="[
          'roleName',
          {
            rules: [{ required: true, message: '角色名称必须输入' },
            { min: 2, message: '角色名至少2位' }]
          },
        ]"/>
    </a-item>
  </a-form>
</template>

<script>
import {
  Input,
  Form
} from 'ant-design-vue'

// const formItemLayout = {
//   labelCol: { span: 4 }, // 左侧label的宽度
//   wrapperCol: { span: 15 }, // 右侧包裹的宽度
// }
export default {
  beforeMount () {
    // console.log('setFoem: ' + this.setForm)
    this.setForm(this.form)
  },
  // 初始化时创建form对象
  created () {
    this.form = this.$form.createForm(this, {
      name: 'global_state',
      onFieldsChange: (_, changedFields) => {
        this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {
          parebtId: this.$form.createFormField({
            ...this.parebtId
          })
        }
      },
      onValuesChange (_, values) {
        console.log('初始化回调： ' + values)
      }
    })
  },
  props: {
    setForm: Function
  },
  components: {
    AForm: Form,
    AInput: Input,
    AItem: Form.Item
  }
}
</script>
<style lang="less" rel="stylesheet/less">
</style>
