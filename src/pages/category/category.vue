<template>
  <a-card class="huan"
  >
    <template v-slot:title>
      <div style="text-align:left">
        <LinkButton @logout="showCategorys">一级分类列表</LinkButton>
        <span v-if="parentId!=='0'">
          <a-icon type="right" style="marginRight: 5"/>
          parentName
        </span>
      </div>

    </template>
    <template v-slot:extra>
      <a-button @click="showAdd">
        <a-icon type="plus"/>
        添加
      </a-button>
    </template>

    <a-table
      :columns="columns"
      :dataSource="parentId==='0' ? categorys : subCategorys"
      :loading="loading"
      bordered
      rowKey="_id"
      :pagination="{defaultPageSize: 5, showQuickJumper: true}"
    >
      <LinkButton slot="name" slot-scope="text" style="width: 15vw">{{text}}</LinkButton>
      <span slot="customTitle" ><a-icon type="smile-o" /> 分类名称</span>
      <template slot="action"  slot-scope="record">
        <LinkButton @logout="showUpdate(record)">修改分类</LinkButton>
        <a-divider type="vertical" />
        <LinkButton  class="ant-dropdown-link" @logout="showSubCategorys(record)">查看子分类<a-icon type="down" /> </LinkButton>
      </template>
    </a-table>
    <a-modal title="添加分类"
             :visible="showStatus===1"
             @ok="addCategory"
             @cancel=" handleCancel"
    >
      <AddForm
        :categorys="categorys"
        :parentId="parentId" :setForm="Func"
      ></AddForm>
    </a-modal>
    <a-modal
      title="更新分类"
      :visible="showStatus===2"
      @ok="this.updateCategory"
      @cancel="this.handleCancel"
    >
      <UpdateForm
        :categoryName="category.name"
        :setForm="(form) => {this.form = form}"
      ></UpdateForm>
    </a-modal>
  </a-card>
</template>

<script>
import {
  Card,
  Table,
  Button,
  Icon,
  Divider,
  message,
  Modal
} from 'ant-design-vue'
import AddForm from './add-form.vue'
import UpdateForm from './update-from.vue'
import LinkButton from '../../components/link-button/link-button.vue'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api/index'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    width: '60%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '操作',
    key: 'action',
    width: '40%',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mounted () {
    this.getCategorys()
  },
  data () {
    return {
      category: Object,
      columns: columns, // 初始化Table所有列的数组
      loading: true, // 是否正在获取数据中
      categorys: [], // 一级分类列表
      subCategorys: [], // 二级分类列表
      parentId: '0', // 当前需要显示的分类列表的父分类ID
      parentName: '', // 当前需要显示的分类列表的父分类名称
      showStatus: 0 // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
    }
  },
  methods: {
    // 获取子组件的表单
    Func (form) { this.form = form },
    /*
  异步获取一级/二级分类列表显示
  parentId: 如果没有指定根据状态中的parentId请求, 如果指定了根据指定的请求
   */
    async getCategorys (parentId) {
      // 在发请求前, 显示loading
      this.loading = true
      parentId = parentId || this.parentId
      // 发异步ajax请求, 获取数据
      const result = await reqCategorys(parentId)
      console.log(result)
      // 在请求完成后, 隐藏loading
      this.loading = false
      if (result.status === 0) {
        // 取出分类数组(可能是一级也可能二级的)
        const data = result.data
        // console.log(data)
        if (parentId === '0') {
          // 更新一级分类状态
          console.log(data)
          this.categorys = data
          console.log('----', data !== [] ? this.categorys : '空')
        } else {
          console.log(data)
          // 更新二级分类状态
          this.subCategorys = data
        }
      } else {
        message.error('获取分类列表失败')
      }
    },

    /*
    显示指定一级分类对象的二子列表
     */
    showSubCategorys (category) {
      // 更新状态
      this.parentId = category._id
      this.parentName = category.name
      console.log('parentId', this.parentId) // '0'
      // 获取二级分类列表显示
      this.getCategorys(this.parentId)
      // setState()不能立即获取最新的状态: 因为setState()是异步更新状态的
      // console.log('parentId', this.state.parentId) // '0'
    },

    /*
    显示指定一级分类列表
     */
    showCategorys () {
      // 更新为显示一列表的状态
      this.parentId = '0'
      this.parentName = ''
      this.subCategorys = []
    },

    /*
    响应点击取消: 隐藏确定框
     */
    handleCancel () {
      // 清除输入数据
      // this.form.resetFields()
      // 隐藏确认框
      this.showStatus = 0
    },

    /*
    显示添加的确认框
     */
    showAdd () {
      this.showStatus = 1
    },

    /*
    添加分类
     */
    addCategory () {
      // console.log('Form: ' + this.form)
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // 所有表单进行校验
          console.log('Received values of form: ', values)
          // 隐藏确认框
          this.showStatus = 0

          // 收集数据, 并提交添加分类的请求
          const { parentId, categoryName } = values
          // 清除输入数据
          this.form.resetFields()
          const result = await reqAddCategory(categoryName, parentId)
          if (result.status === 0) {
            // 添加的分类就是当前分类列表下的分类
            if (parentId === this.parentId) {
              // 重新获取当前分类列表显示
              this.getCategorys()
            } else if (parentId === '0') { // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
              this.getCategorys('0')
            }
          }
        }
      })
    },

    /*
    显示修改的确认框
     */
    showUpdate (category) {
      // 保存分类对象
      this.category = category
      // console.log(category)
      // 更新状态
      this.showStatus = 2
    },

    /*
    更新分类
     */
    updateCategory () {
      console.log('updateCategory()')
      // 进行表单验证, 只有通过了才处理
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // 1. 隐藏确定框
          this.showStatus = 0

          // 准备数据
          const categoryId = this.category._id
          const { categoryName } = values
          // 清除输入数据
          this.form.resetFields()

          // 2. 发请求更新分类
          const result = await reqUpdateCategory({ categoryId, categoryName })
          if (result.status === 0) {
            // 3. 重新显示列表
            this.getCategorys()
          }
        }
      })
    }
  },
  components: {
    ACard: Card,
    ATable: Table,
    AButton: Button,
    AIcon: Icon,
    ADivider: Divider,
    AModal: Modal,
    AddForm,
    UpdateForm,
    LinkButton
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/huan";
</style>
