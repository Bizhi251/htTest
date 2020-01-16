<template>
  <a-card class="huan">
    <template v-slot:title>
     <span>
        <a-select
          :value= "searchType"
          style="width: 150px"
          :onChange="value => this.setState({searchType:value})"
        >
          <a-select-option value='productName'>按名称搜索</a-select-option>
          <a-select-option value='productDesc'>按描述搜索</a-select-option>
       </a-select>
       <a-input
         placeholder='关键字'
         style="width: 150px; margin: 0px 15px"
         :value="searchName"
         onChange="e => this.setState({searchName:event.target.value})"
        />
        <a-button type='primary' @click="() => this.getProducts(1)">搜索</a-button>
      </span>
    </template>
    <template v-slot:extra>
      <router-link :to="'/product/addupdate'">
        <a-button>
          <a-icon type="plus"/>
          添加商品
        </a-button>
      </router-link>
    </template>
    <a-table
      bordered
      rowKey='_id'
      :loading='loading'
      :dataSource='products'
      :columns='columns'
      :pagination="{
        current: pageNum,
        total,
        defaultPageSize: PAGE_SIZE,
        showQuickJumper: true,
        onChange: this.getProducts
      }"
    >
      <template slot="status" slot-scope="record">
        <a-button
          type='primary'
          @click="updateStatus(record._id, record.status===1 ? 2 : 1)"
        >
        {{record.status === 1 ? '下架' : '上架'}}
        </a-button>
        <span>{{record.status===1 ? '在售' : '已下架'}}</span>
      </template>
      <template slot="action"  slot-scope="record">
        <router-link :to="{path: '/product/detail', query: record}">
          <LinkButton>详情</LinkButton>
        </router-link>
        <a-divider type="vertical" />
        <router-link :to="{path: '/product/addupdate', query: record}">
          <LinkButton>修改</LinkButton>
        </router-link>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Divider,
  Table,
  message
} from 'ant-design-vue'
import LinkButton from '../../components/link-button/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name'
  },
  {
    title: '商品描述',
    dataIndex: 'desc'
  },
  {
    title: '价格',
    dataIndex: 'price'
    // render: (price) => '¥' + price // 当前指定了对应的属性, 传入的是对应的属性值
  },
  {
    width: 100,
    title: '状态',
    // dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    width: 100,
    title: '操作',
    // dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      pageNum: 1,
      PAGE_SIZE,
      columns: columns,
      total: 0, // 商品的总数量
      products: [], // 商品的数组
      loading: false, // 是否正在加载中
      searchName: '', // 搜索的关键字
      searchType: 'productName' // 根据哪个字段搜索
    }
  },
  mounted () {
    this.getProducts(1)
  },
  methods: {
    async updateStatus (productId, status) {
      const result = await reqUpdateStatus(productId, status)
      if (result.status === 0) {
        message.success('更新商品成功')
        this.getProducts(this.pageNum)
      }
    },
    async getProducts (pageNum) {
      this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
      this.loading = true // 显示loading
      // console.log('#####' + this.pageNum + '####' + PAGE_SIZE)
      const searchName = this.searchName
      const searchType = this.searchType
      // 如果搜索关键字有值, 说明我们要做搜索分页
      let result
      if (searchName) {
        result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
      } else { // 一般分页请求
        result = await reqProducts(pageNum, PAGE_SIZE)
        console.log(result)
      }

      this.loading = false// 隐藏loading
      if (result.status === 0) {
        // 取出分页数据, 更新状态, 显示分页列表
        const { total, list } = result.data
        this.total = total
        this.products = list
      }
    }
  },
  components: {
    ACard: Card,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    AButton: Button,
    AIcon: Icon,
    ATable: Table,
    ADivider: Divider,
    LinkButton
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/huan";
</style>
