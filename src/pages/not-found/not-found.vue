<template>
  <a-row class='not-found'>
    <a-col span={12} class='left'>
<!--      <div></div>
    </a-col>
    <a-col span={12} class='right'>-->
      <h1>404</h1>
      <h2>抱歉，你访问的页面不存在</h2>
      <div>
        <a-button type='primary' @click="() => this.$router.history.replace('/')">
        回到首页
        </a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { Button, Row, Col } from 'ant-design-vue'
export default {
  components: {
    AButton: Button,
    ARow: Row,
    ACol: Col
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .not-found{
    background-color: #f0f2f5;
    height: 100%;
    margin: 20px;
    .left {
      height: 100%;
      background: url('./images/404.png') no-repeat center;
      h1 {
        font-size: 35px;
      }
      h2 {
        margin-bottom: 20px;
        font-size: 20px;
      }
    }
/*    .right {
      padding-left: 50px;
      margin-top: 150px;
      h1 {
        font-size: 35px;
      }
      h2 {
        margin-bottom: 20px;
        font-size: 20px;
      }
    }*/
  }
</style>
