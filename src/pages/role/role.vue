<template>
  <a-card class="huan">
    <a-table
      :rowSelection="rowSelection"
      bordered
      rowKey='_id'
      :loading='loading'
      :dataSource='roles'
      :columns='columns'
      :pagination="{
        defaultPageSize: 5,
        showQuickJumper: true,
      }"
    >
      <template v-slot:title>
        <a-button type='primary' @click='ShowAdd'>创建角色</a-button> &nbsp;&nbsp;
        <a-button type='primary' :disabled='!role._id' @click='ShowAuth'>设置角色权限</a-button>
      </template>
    </a-table>

    <a-modal
      title="添加角色"
      :visible='isShowAdd'
      @ok='addRole'
      @cancel='unShowAdd'
    >
      <AddForm
        :setForm='Func'
      />
    </a-modal>
    <a-modal
      ref="pw"
      title="设置角色权限"
      v-model='isShowAuth'
      @ok='updateRole'
      @cancel='unShowAuth'>
      <AuthForm
        ref="auth"
        :role='role'></AuthForm>
    </a-modal>
  </a-card>
</template>

<script>
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'ant-design-vue'
import {
  reqRoles,
  reqAddRole,
  reqUpdateRole
} from '../../api'

import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'

import AddForm from './add-form'
import AuthForm from './auth-form'
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    customRender: (createTime) => formateDate(createTime)
  },
  {
    title: '授权时间',
    dataIndex: 'auth_time',
    customRender: (authTime) => formateDate(authTime)
  },
  {
    title: '授权人',
    dataIndex: 'auth_name'
  }
]

export default {
  mounted () {
    this.getRoles()
  },
  data () {
    return {
      auth: {},
      // pageNum: 1,
      loading: false, // 是否正在加载中
      total: 0,
      roles: [], // 所有角色的列表
      role: {}, // 选中的role
      isShowAdd: false, // 是否显示添加界面
      isShowAuth: false, // 是否显示设置权限界面
      columns: columns
    }
  },
  methods: {
    // 获取子组件的表单
    Func (form) { this.form = form },
    ShowAdd () {
      this.isShowAdd = true
      console.log(this.isShowAdd)
    },
    unShowAdd () {
      this.isShowAdd = false
    },
    unShowAuth () {
      console.log(this.$refs.auth)
      this.isShowAuth = false
    },
    ShowAuth () {
      this.isShowAuth = true
      console.log(this.role.menus)
    },
    async getRoles () {
      const result = await reqRoles()
      if (result.status === 0) {
        const roles = result.data
        this.roles = roles
      }
    },
    /*
    添加角色
     */
    addRole () {
      // 进行表单验证, 只能通过了才向下处理
      this.form.validateFields(async (error, values) => {
        if (!error) {
          // 隐藏确认框
          this.isShowAdd = false

          // 收集输入数据
          const { roleName } = values
          this.form.resetFields()

          // 请求添加
          const result = await reqAddRole(roleName)
          // 根据结果提示/更新列表显示
          if (result.status === 0) {
            message.success('添加角色成功')
            // this.getRoles()
            // 新产生的角色
            const role = result.data
            // 更新roles状态
            // const roles = this.state.roles
            // roles.push(role)
            // this.setState({
            //   roles
            // })

            // 更新roles状态: 基于原本状态数据更新
            this.roles = [...this.roles, role]
          } else {
            message.success('添加角色失败')
          }
        }
      })
    },

    /*
    更新角色
     */
    async updateRole () {
      // 隐藏确认框
      this.auth = this.$refs.auth
      this.isShowAuth = false
      console.log(this.auth)
      const role = this.role
      // 得到最新的menus
      const menus = this.auth.checkedKeys
      role.menus = menus
      role.auth_time = Date.now()
      role.auth_name = memoryUtils.user.username

      // 请求更新
      const result = await reqUpdateRole(role)
      if (result.status === 0) {
        // this.getRoles()
        // 如果当前更新的是自己角色的权限, 强制退出
        if (role._id === memoryUtils.user.role_id) {
          memoryUtils.user = {}
          storageUtils.removeUser()
          this.$router.history.replace('/login')
          message.success('当前用户角色权限成功')
          this.auth = {}
        } else {
          message.success('设置角色权限成功')
          this.roles = [...this.roles]
        }
      }
    }
  },
  computed: {
    rowSelection () {
      const that = this
      // const { selectedRowKeys } = this
      return {
        type: 'radio',
        selectedRowKeys: [this.role._id],
        hideDefaultSelections: true,
        onSelect: (role) => {
          that.role = role
          console.log(this.role)
        }
        // 选择框的默认属性
        // getCheckboxProps: record => ({
        //   props: {
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name
        //   }
        // })
      }
    }
  },
  components: {
    ACard: Card,
    AButton: Button,
    ATable: Table,
    AModal: Modal,
    AddForm,
    AuthForm
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/huan";
</style>
