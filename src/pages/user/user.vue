<template>
  <a-card title={title}>
    <Table
    />
    <a-modal
      title="user._id ? '修改用户' : '添加用户'"
    >
<!--    <UserForm-->
<!--    />-->
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
