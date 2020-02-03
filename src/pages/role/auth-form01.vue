<template>
  <div>
    <a-item label='角色名称' >
      <a-input value='role.name' disabled/>
    </a-item>

    <a-tree
      checkable
      :defaultExpandAll=true
      :checkedKeys='checkedKeys'
      @check='onCheck'
    >
      <a-tree-node title="平台权限" key="all">
        {treeNodes}
      </a-tree-node>
    </a-tree>
  </div>
</template>

<script>
import {
  Form,
  Input,
  Tree
} from 'ant-design-vue'

// const formItemLayout = {
//   labelCol: { span: 4 },  // 左侧label的宽度
//   wrapperCol: { span: 15 }, // 右侧包裹的宽度
// }
export default {
  props: {
    role: Object
  },
  data () {
    return {
      checkedKeys: this.role
    }
  },
  methods: {
    /*
  为父组件提交获取最新menus数据的方法
   */
    // getMenus () {
    //   this.checkedKeys
    // },
    // getTreeNodes (menuList) {
    //   return menuList.reduce((pre, item) => {
    //     pre.push(
    //     <TreeNode title={item.title} key={item.key}>
    //       {item.children ? this.getTreeNodes(item.children) : null}
    //       </TreeNode>
    //   )
    //     return pre
    //   }, [])
    // },
    // 选中某个node时的回调
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    }
  },
  components: {
    AItem: Form.Item,
    AInput: Input,
    ATree: Tree,
    ATreeNode: Tree.TreeNode
  }
}
</script>
<style lang="less" rel="stylesheet/less">
</style>
