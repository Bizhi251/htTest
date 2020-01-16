<template>
  <a-card className='product-detail'>
    <template v-slot:title>
      <div style="text-align:left">
        <LinkButton @logout="goto">
          <a-icon type='arrow-left' style='fontSize: 20'/>
        </LinkButton>
        <span>商品详情</span>
      </div>
    </template>
    <a-list>
      <a-list-item>
        <span class="left">商品名称:</span>
        <span>{{query.name}}</span>
      </a-list-item>
      <a-list-item>
        <span class="left">商品描述:</span>
        <span>{{query.desc}}</span>
      </a-list-item>
      <a-list-item>
        <span class="left">商品价格:</span>
        <span>{{query.price}}元</span>
      </a-list-item>
      <a-list-item>
        <span class="left">所属分类:</span>
        <span></span>
      </a-list-item>
      <a-list-item>
        <span class="left">商品图片:</span>
        <span v-for="img in imgs" :key="img">
          <img
            :src="BASE_IMG_URL + img"
            class="product-img"
            alt="img"
          />
        </span>
      </a-list-item>
      <a-list-item>
        <span class="left">商品详情:</span>
        <span>{{ToText(query.detail)}}</span>
      </a-list-item>

    </a-list>
  </a-card>
</template>
<script>
import {
  Card,
  Icon,
  List
} from 'ant-design-vue'

import LinkButton from '../../components/link-button/link-button'
import { BASE_IMG_URL } from '../../utils/constants'

export default {
  data () {
    return {
      BASE_IMG_URL,
      query: this.$route.query,
      imgs: this.$route.query.imgs
    }
  },
  methods: {
    goto () {
      this.$router.go(-1)
    },
    ToText (HTML) {
      var input = HTML
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
    }
  },
  components: {
    ACard: Card,
    AIcon: Icon,
    AList: List,
    AListItem: List.Item,
    LinkButton
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .left {
    margin-right: 15px;
    font-size: 20px;
    font-weight: bold;
  }
  .product-img {
    width: 150px;
    height: 150px;
    border: 1px solid #002140;
    margin-right: 10px;
  }
</style>
