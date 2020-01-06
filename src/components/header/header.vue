<template>
  <div class="header">
    <div class="header-top">
      <span>欢迎, {{username}}</span>
      <LinkButton @logout="logout">
        <span>退出</span>
      </LinkButton>
      <a href="javascrip:" @click="logout">
        退出01
      </a>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-left">{{getTitle}}</div>
      <div class="header-bottom-right">
        <span>{{currentTime}}</span>
        <img :src="dayPictureUrl" :alt="weather"/>
        <span>{{weather}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'ant-design-vue'
import LinkButton from '../link-button/link-button'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
export default {
  data () {
    return {
      currentTime: formateDate(Date.now()), // 当前时间字符串
      dayPictureUrl: {}, // 天气图片url
      weather: {}, // 天气的文本
      username: memoryUtils.user.add
    }
  },
  /*
   第一次render()之后执行一次
   一般在此执行异步操作: 发ajax请求/启动定时器
    */
  mounted () {
    // 获取当前的时间
    this.getTime()
    // 获取当前天气
    // this.getWeather()
  },
  beforeMount () {
    // 清除定时器
    clearInterval(this.intervalId)
  },
  methods: {
    getTime () {
      // 每隔1s获取当前时间, 并更新状态数据currentTime
      this.intervalId = setInterval(() => {
        const currentTime = formateDate(Date.now())
        this.currentTime = currentTime
      }, 1000)
    },
    getWeather: async function () {
      // 调用接口请求异步获取数据
      const { dayPictureUrl, weather } = await reqWeather('北京')
      // 更新状态
      console.log(dayPictureUrl + ':' + weather)
      this.dayPictureUrl = dayPictureUrl
      this.weather = weather
    },
    /*
    退出登陆
     */
    logout () {
      const that = this
      // 显示确认框
      Modal.confirm({
        content: '确定退出吗?',
        onOk () {
          console.log('OK', that)
          // 删除保存的user数据
          storageUtils.removeUser()
          memoryUtils.user = {}
          // 跳转到login
          that.$router.go(0)
        }
      })
    }
  },
  components: {
    LinkButton
  },
  computed: {
    getTitle: function () {
      // 得到当前请求路径
      // const path = this.props.location.pathname
      const path = this.$route.path.substr(6)
      // console.log('path' + path)
      let title
      menuList.forEach(item => {
        if (item.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
          title = item.title
        } else if (item.children) {
          // 在所有子item中查找匹配的
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          // 如果有值才说明有匹配的
          if (cItem) {
            // 取出它的title
            title = cItem.title
          }
        }
      })
      return title
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.header {
  color: gray;
  height: 80px;
  background-color: #fff;
  .header-top {
    height: 40px;
    line-height: 40px;
    padding-right: 30px;
    text-align: right;
    border-bottom: 1px solid #1da57a;
    span {
      margin-right: 10px;
    }
  }
  .header-bottom {
    height: 40px;
    display: flex;
    align-items: center;
    .header-bottom-left {
      height: 30px;
      position: relative;
      width: 25%;
      text-align: center;
      font-size: 20px;
      line-height: 18px;
      &::after {
        content: '';
        position: absolute;
        right: 50%;
        top: 100%;
        transform: translateX(50%);
        border-top: 20px solid white;
        border-right: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 20px solid transparent;
      }
    }
    .header-bottom-right {
      width: 75%;
      text-align: right;
      margin-right: 30px;
      img {
        margin: 0 15px;
        width: 30px;
        height: 20px;
      }
    }
  }
}

</style>
