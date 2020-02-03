<template>
  <a-card class="huan" >
    <template v-slot:title >
      <div style="text-align:left">
        <a-button type='primary' @click="showAdd">创建用户</a-button> &nbsp;&nbsp;
      </div>
    </template>
    <a-table
      bordered
      rowKey='_id'
      :loading='loading'
      :dataSource='users'
      :columns='columns'
      :pagination="{
        defaultPageSize: 5,
        showQuickJumper: true,
      }"
    >
      <template slot="action"  slot-scope="record">
        <LinkButton @logout="showUpdate(record)">修改</LinkButton>
        <LinkButton @logout="deleteUser(record)">删除</LinkButton>
      </template>
    </a-table>

    <a-modal
      :title="user._id ? '修改用户' : '添加用户'"
      :visible='isShow'
      @ok='addOrUpdateUser'
      @cancel='unShow'
    >
      <UserForm
        :setForm='Func'
        :roles="roles"
        :user="user"
      />
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

import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button/link-button'
import {
  reqDeleteUser,
  reqUsers,
  reqAddOrUpdateUser
} from '../../api/index'
import UserForm from './user-form'

export default {
  mounted () {
    this.getUsers()
  },
  beforeMount () {
    this.initRoleNames(this.roles)
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        customRender: formateDate

      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        customRender: (roleId) => this.roleNames[roleId]
      },
      {
        title: '操作',
        scopedSlots: { customRender: 'action' }
      }
    ]
  },
  data () {
    return {
      roleNames: {},
      loading: false, // 是否正在加载中
      columns: {},
      users: [], // 所有用户列表
      roles: [], // 所有角色列表
      user: {},
      isShow: false // 是否显示确认框
    }
  },
  methods: {
    // 获取子组件的表单
    Func (form) { this.form = form },
    /*
      根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
    */
    initRoleNames (roles) {
      const roleNames = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      }, {})
      // 保存
      this.roleNames = roleNames
    },
    /*
    显示添加界面
     */
    showAdd () {
      this.user = {} // 去除前面保存的user
      this.isShow = true
    },
    /*
    隐藏添加界面
     */
    unShow () {
      this.user = {} // 去除前面保存的user
      this.isShow = false
    },
    /*
    显示修改界面
     */
    showUpdate (user) {
      console.log('修改')
      this.user = user // 保存user
      this.isShow = true
    },
    /*
    删除指定用户
     */
    deleteUser (user) {
      console.log('删除')
      Modal.confirm({
        title: `确认删除${user.username}吗?`,
        onOk: async () => {
          const result = await reqDeleteUser(user._id)
          if (result.status === 0) {
            message.success('删除用户成功!')
            this.getUsers()
          }
        }
      })
    },
    /*
    添加/更新用户
     */
    async addOrUpdateUser () {
      this.isShow = false
      // 1. 收集输入数据
      const user = this.form.getFieldsValue()
      this.form.resetFields()
      // 如果是更新, 需要给user指定_id属性
      console.log(this.user)
      if (this.user._id) {
        user._id = this.user._id
      }
      // 2. 提交添加的请求
      const result = await reqAddOrUpdateUser(user)
      // 3. 更新列表显示
      if (result.status === 0) {
        message.success(`${this.user._id ? '修改' : '添加'}用户成功`)
        this.getUsers()
      }
    },
    async getUsers () {
      const result = await reqUsers()
      console.log(result.data)
      if (result.status === 0) {
        const { users, roles } = result.data
        this.initRoleNames(roles)
        this.users = users
        this.roles = roles
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
    UserForm,
    LinkButton
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/huan";
</style>
