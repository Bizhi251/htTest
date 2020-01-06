<template>
  <a-card title={title}>
    <Table
    />

    <a-modal
      title="添加角色"
    >
<!--    <AddForm-->
<!--    />-->
<!--    </a-modal>-->

<!--    <a-modal-->
<!--      title="设置角色权限"-->
<!--    >-->
<!--    <AuthForm />-->
      </a-modal>
  </a-card>
</template>

<script>
import {
  Card,
  // Button,
  // Table,
  Modal
  // message
} from 'ant-design-vue'
export default {
  components: {
    ACard: Card,
    // AButton: Button,
    // ATable: Table,
    AModal: Modal
    // message
  }
}
</script>
<style lang="less" rel="stylesheet/less">
</style>
