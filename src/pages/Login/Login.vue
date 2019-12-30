<template>
  <div>
    <div class="login">
      <header class="login-header">
        <img src='../../assets/images/logo.png' alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section class="login-content">
        <h2>用户登陆</h2>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
              placeholder="账号姓名"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
              type="password"
              placeholder="账号密码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
            >
              记住我
            </a-checkbox>
            <a class="login-form-forgot" href="">
              忘记密码
            </a>
            <a-button type="primary" html-type="submit" class="login-form-button">
              登陆
            </a-button>
            Or
            <a href="">
              现在就去注册!
            </a>
          </a-form-item>
        </a-form>
      </section>
    </div>
  </div>
</template>

<script>
import { Button, Form, Icon, Input, Checkbox } from 'ant-design-vue'
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  },
  components: {
    AButton: Button,
    AForm: Form,
    AIcon: Icon,
    AInput: Input,
    ACheckbox: Checkbox,
    AFormItem: Form.Item
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .login {
    width: 100%;
    height: 100%;
    background-image: url('./images/bg.jpg');
    background-size: 100% 100%;
    .login-header {
      display: flex;
      align-items: center;
      height: 80px;
      background-color: rgba(21, 20, 13, 0.5);
      img {
        width: 40px;
        height: 40px;
        margin: 0 15px 0 50px;
      }
      h1 {
        font-size: 30px;
        color: white;
        min-width: 400px;
      }
    }

    .login-content {
      width: 400px;
      max-height: 400px;
      background-color: #fff;
      margin: 50px auto;
      padding: 20px 40px;
      h2 {
        text-align: center;
        font-size: 30px;
        font-weight:bold;
        margin-bottom: 20px;
      }
      .login-form {
        max-width: 500px;
        .login-form-forgot {
          float: right;
        }
        .login-form-button {
          width: 100%;
        }
      }
    }
  }
</style>
