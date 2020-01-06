<template>
  <a-form layout='inline' :form="form">
    <a-form-item label='CategoryName'>
      <a-input
        v-decorator="[
          'categoryName',
          {
            rules: [{ required: true, message: 'CategoryName is required!' }],
          }
        ]"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import {
  Form,
  // Select,
  Input
} from 'ant-design-vue'
export default {
  name: 'categoryName',
  props: {
    categoryName: Object
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
            ...this.categoryName,
            value: this.categoryName.value
          })
        }
      },
      onValuesChange (_, values) {
        console.log(values)
      }
    })
  },
  watch: {
    categoryName () {
      this.form.updateFields({
        categoryName: this.$form.createFormField({
          ...this.categoryName,
          value: this.categoryName.value
        })
      })
    }
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    // ASelect: Select,
    // ASelectOption: Select.option,
    AInput: Input
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
