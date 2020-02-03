<template>
  <div>
    <a-form-item  label='角色名称'>
      <a-input style="margin-bottom: 8px"
               :value="role.name" disabled />
    </a-form-item>
    <a-tree
      checkable
      @expand="onExpand"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      v-model="checkedKeys"
      @select="onSelect"
      :selectedKeys="selectedKeys"
      :treeData="treeData"
    >
    </a-tree>
  </div>
</template>

<script>
import {
  Form,
  Input,
  Tree
} from 'ant-design-vue'

import menuList from '../../config/menuConfig'
const treeData = [
  {
    title: '平台权限',
    key: 'all',
    children: [...menuList]
  }
]
export default {
  updated () {
    console.log(this.role)
  },
  props: {
    role: Object
  },
  data () {
    return {
      checkedKeys: this.role.menus,
      expandedKeys: ['all'],
      autoExpandParent: true,
      selectedKeys: [],
      treeData
    }
  },
  // computed: {
  //   checkedKeys: this.role.menus
  // },
  watch: {
    role (val) {
      this.checkedKeys = this.role.menus
    },
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    onChange (e) {
      console.log('###')
    }
  },
  components: {
    AInput: Input,
    AFormItem: Form.Item,
    ATree: Tree
  }
}
</script>
