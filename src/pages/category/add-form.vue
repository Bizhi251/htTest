<template>
  <a-form layout='inline' :form="form">
    <a-form-item
      :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
    >
      <a-select
        v-decorator="[
          'parentId',{initialValue: '0'}
        ]"
      >
        <a-select-option value="0">
          一级分类
        </a-select-option>
        <a-select-option value="c._id" v-for="c in categorys" :key="c._id">
          {{c.name}}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
      <a-input  v-decorator="[
          'categoryName',
          {
            rules: [{ required: true, message: '分类名称必须输入' },
            { min: 2, message: '分类名至少2位' }]
          },
        ]" placeholder='请输入分类名称'/>
    </a-form-item>
  </a-form>
</template>

<script>
import {
  Form,
  Select,
  Input
} from 'ant-design-vue'
// import { Select } from './select'

export default {
  beforeMount () {
    console.log('setFoem: ' + this.setForm)
    this.setForm(this.form)
  },
  props: {
    // categoryName: Object,
    setForm: Function,
    categorys: Array,
    parentId: String
  },
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
  watch: {
    categoryName () {
      this.form.updateFields({
        categoryName: this.$form.createFormField({
          ...this.categoryName
        })
      })
    },
    parebtId () {
      this.form.updateFields({
        parebtId: this.$form.createFormField({
          ...this.parebtId
        })
      })
    }
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input
    // Select
  }
}
</script>
<style lang="less" rel="stylesheet/less">

</style>
