<template>
  <a-card>
    <template v-slot:title>
      <div style="text-align:left">
        <LinkButton @logout="goto">
          <a-icon type='arrow-left' style='fontSize: 20'/>
        </LinkButton>
        <span v-if="isUpdate">修改商品</span>
        <span v-else>添加商品</span>
      </div>
    </template>

    <a-form :form="form" @submit="submit">
      <a-form-item label="商品名称" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input placeholder='请输入商品名称' v-decorator="[
          'name',
          { rules: [{ required: true, message: '必须输入商品名称' },
                    { min: 2, message: '用户名至少2位' }],
            initialValue: this.$route.query.name
          },
        ]"/>
      </a-form-item>
      <a-form-item label="商品描述" :label-col="labelCol" :wrapper-col="wrapperCol">
       <a-text-area placeholder="请输入商品描述" v-decorator="[
          'desc',
          { rules: [{ required: true, message: '必须输入商品描述' }],
            initialValue: this.$route.query.desc },
        ]"/>
      </a-form-item>
      <a-form-item label="商品价格" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-input type='number' placeholder='请输入商品价格' addonAfter='元' v-decorator="[
          'price',
          { rules: [{ required: true, message: '必须输入商品价格' }],
            initialValue: this.$route.query.price },
        ]"/>
      </a-form-item>
      <a-form-item label="商品分类" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-cascader
          placeholder='请指定商品分类'
          :options='options'
          :loadData="loadData"
          v-decorator="[
           'categoryIds',
           { rules: [{ required: true, message: '必须指定商品分类' }],
            initialValue: categoryIds},
          ]"
          changeOnSelect>
        </a-cascader>
      </a-form-item>
      <a-form-item label="商品图片" :label-col="labelCol" :wrapper-col="wrapperCol">
        <PicturesWall ref="pw" :imgs='imgs'/>
      </a-form-item>
      <a-form-item label="商品详情" :label-col="labelCol" :wrapper-col="wrapperCol">
        <RichTextEditor ref="editor" :detail="detail"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import {
  Card,
  Icon,
  Form,
  Input,
  Cascader,
  Button,
  message
} from 'ant-design-vue'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components/link-button/link-button'
import {
  reqCategorys,
  reqAddOrUpdateProduct
} from '../../api/index'

export default {
  mounted () {
    console.log(this.$route.query)
    // let obj = this.$route.query.imgs
    this.getCategorys('0')
    this.categoryIds.push(this.$route.query.categoryId)
    // this.imgs = obj
    // this.detail = this.$route.query.detail
    this.product = this.$route.state || {}
  },
  data () {
    return {
      categoryIds: [],
      form: this.$form.createForm(this, { name: 'add-update' }),
      options: [], // 分类
      labelCol: { // label布局
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: { // 布局
        xs: { span: 24 },
        sm: { span: 10 }
      },
      imgs: this.$route.query.imgs || [], // 图
      detail: this.$route.query.detail || '', // 富文本
      isUpdate: !!this.$route.query.status, // 是否是修改
      product: this.$route.query.pCategoryId
    }
  },
  methods: {
    goto () {
      this.$router.go(-1)
    },
    async initOptions (categorys) {
      // 根据categorys生成options数组
      const options = categorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: false // 不是叶子
      }))

      // 如果是一个二级分类商品的更新
      const isUpdate = false
      const pCategoryId = this.product
      if (isUpdate && pCategoryId !== '0') {
        // 获取对应的二级分类列表
        const subCategorys = await this.getCategorys(pCategoryId)
        // 生成二级下拉列表的options
        const childOptions = subCategorys.map(c => ({
          value: c._id,
          label: c.name,
          isLeaf: true
        }))

        // 找到当前商品对应的一级option对象
        const targetOption = options.find(option => option.value === pCategoryId)

        // 关联对应的一级option上
        targetOption.children = childOptions
      }
      // 更新options状态
      this.options = [...options]
    },

    /*
    异步获取一级/二级分类列表, 并显示
    async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
     */
    async getCategorys (parentId) {
      const result = await reqCategorys(parentId) // {status: 0, data: categorys}
      // console.log('Result: ' + result.data)
      if (result.status === 0) {
        const categorys = result.data
        // 如果是一级分类列表
        if (parentId === '0') {
          this.initOptions(categorys)
        } else { // 二级列表
          return categorys // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
        }
      }
    },
    /*
    验证价格的自定义验证函数
     */
    // validatePrice (rule, value, callback) {
    //   console.log(value, typeof value)
    //   if (value * 1 > 0) {
    //     callback() // 验证通过
    //   } else {
    //     callback('价格必须大于0') // 验证没通过
    //   }
    // },
    /*
    用加载下一级列表的回调函数
     */
    async loadData (selectedOptions) {
      // 得到选择的option对象
      const targetOption = selectedOptions[0]
      // 显示loading
      targetOption.loading = true

      // 根据选中的分类, 请求获取二级分类列表
      const subCategorys = await this.getCategorys(targetOption.value)
      console.log('SUB: ' + subCategorys)
      // 隐藏loading
      targetOption.loading = false
      // 二级分类数组有数据
      if (subCategorys && subCategorys.length > 0) {
        // 生成一个二级列表的options
        const childOptions = subCategorys.map(c => ({
          value: c._id,
          label: c.name,
          isLeaf: true
        }))
        // 关联到当前option上
        targetOption.children = childOptions
      } else { // 当前选中的分类没有二级分类
        targetOption.isLeaf = true
      }

      // 更新options状态
      this.options = [...this.options]
    },
    submit () {
      // 进行表单验证, 如果通过了, 才发送请求
      this.form.validateFields(async (error, values) => {
        if (!error) {
          // 1. 收集数据, 并封装成product对象
          const { name, desc, price, categoryIds } = values
          let pCategoryId, categoryId
          if (categoryIds.length === 1) {
            pCategoryId = '0'
            categoryId = categoryIds[0]
          } else {
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
          }
          // const imgs = this.imgs
          // const detail = this.detail
          const imgs = this.$refs.pw.getImgs()
          const detail = this.$refs.editor.getDetail()
          // const detail = 'XXXXX'
          const product = { name, desc, price, imgs, detail, pCategoryId, categoryId }

          // 如果是更新, 需要添加_id
          if (this.isUpdate) {
            product._id = this.product._id
          }
          console.log(product)
          // 2. 调用接口请求函数去添加/更新
          // eslint-disable-next-line no-debugger
          const result = await reqAddOrUpdateProduct(product)
          // console.log(result)

          // 3. 根据结果提示
          if (result.status === 0) {
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
            this.history.goBack()
          } else {
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
          }
        }
      })
    }

  },
  components: {
    ACard: Card,
    AIcon: Icon,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ACascader: Cascader,
    AButton: Button,
    ATextArea: Input.TextArea,
    PicturesWall,
    RichTextEditor,
    LinkButton
  }
}
</script>
<style lang="less" rel="stylesheet/less">

</style>
