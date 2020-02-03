<template>
  <a-form layout='vertical' :form="form" >
    <a-form-item label='用户名'>
      <a-input placeholder='请输入用户名' v-decorator="[
          'username',{initialValue: user.username}
        ]"/>
    </a-form-item>

    <a-form-item label='密码' v-show="!user._id">
      <a-input type='password' placeholder='请输入密码'
               v-decorator="['password',{initialValue: user.password}]"
      />
    </a-form-item>
    <a-form-item label='手机号'>
      <a-input placeholder='请输入手机号'
               v-decorator="['phone',{initialValue: user.phone}]"
      />
    </a-form-item>
    <a-form-item label='邮箱'>
      <a-input placeholder='请输入邮箱'
               v-decorator="['email',{initialValue: user.email}]"
      />
    </a-form-item>
    <a-form-item label='角色' >
      <a-select v-decorator="['role_id',{initialValue: user.role_id}]">
        <a-select-option :key='role._id' :value='role._id' v-for="role in roles">{{role.name}}</a-select-option>)
      </a-select>
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
    // console.log('setFoem: ' + this.setForm)
    this.setForm(this.form)
  },
  mounted () {
    console.log(this)
  },
  props: {
    setForm: Function, // 用来传递form对象的函数
    roles: Array,
    user: Object
  },
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 4 }, // 左侧label的宽度
        wrapperCol: { span: 15 } // 右侧包裹的宽度
      }
    }
  },
  created () {
    this.form = this.$form.createForm(this, {
      name: 'global_state',
      onFieldsChange: (_, changedFields) => {
        this.$emit('change', changedFields)
      },
      // mapPropsToFields: () => {
      //   return {
      //     username: this.$form.createFormField({
      //       ...this.username
      //     })
      //   }
      // },
      onValuesChange (_, values) {
        console.log('初始化回调： ' + values)
      }
    })
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input
  }
}
</script>
<style lang="less" rel="stylesheet/less">

</style>
