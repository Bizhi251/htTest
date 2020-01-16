<template>
  <div>
    <a-upload
      action="/api/manage/img/upload"
      accept='image/*'
      name='image'
      listType="picture-card"
      :fileList='fileList'
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 3">
        <a-icon type="plus"></a-icon>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>

    <a-modal :visible='previewVisible' :footer='null' @cancel='handleCancel'>
      <img alt="example" style='width: 100%' :src='previewImage' />
    </a-modal>
  </div>
</template>
<script>
import {
  Upload,
  Icon,
  Modal,
  message
} from 'ant-design-vue'
import { reqDeleteImg } from '../../api'
import { BASE_IMG_URL } from '../../utils/constants'

export default {
  // mounted () {
  //   console.log('########')
  //   console.log(this.imgs)
  // },
  props: {
    imgs: {
      type: Array
    }
  },
  data () {
    return {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList: (
        this.imgs && this.imgs.length > 0 ? this.imgs.map((img, index) => ({
          uid: -index, // 每个file都有自己唯一的id
          name: img, // 图片文件名
          status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
          url: BASE_IMG_URL + img
        })) : []
      )
    }
  },
  methods: {
    /*
  获取所有已上传图片文件名的数组
   */
    getImgs () {
      const list = this.fileList
      // console.log(list)
      return list.length === 0 ? [] : list.map(file => file.name)
    },
    /*
    隐藏Modal
     */
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      console.log('handlePreview()', file)
      // 显示指定file对应的大图
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    /*
    file: 当前操作的图片文件(上传/删除)
    fileList: 所有已上传图片文件对象的数组
     */
    async handleChange ({ file, fileList }) {
      console.log('handleChange()', file.status, fileList.length, file === fileList[fileList.length - 1])

      // 一旦上传成功, 将当前上传的file的信息修正(name, url)
      if (file.status === 'done') {
        const result = file.response // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
        if (result.status === 0) {
          message.success('上传图片成功!')
          const { name, url } = result.data
          file = fileList[fileList.length - 1]
          file.name = name
          file.url = url
        } else {
          message.error('上传图片失败')
        }
      } else if (file.status === 'removed') { // 删除图片
        const result = await reqDeleteImg(file.name)
        if (result.status === 0) {
          message.success('删除图片成功!')
        } else {
          message.error('删除图片失败!')
        }
      }
      // 在操作(上传/删除)过程中更新fileList状态
      this.fileList = fileList
    }
  },
  components: {
    AUpload: Upload,
    AIcon: Icon,
    AModal: Modal
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
