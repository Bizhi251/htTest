import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// import { Button, Form, Icon, Input, Checkbox, message } from 'ant-design-vue'
// Vue.use([Button, Form, Icon, Input, Checkbox, message])

Vue.config.productionTip = false
// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    // if (localStorage.getItem('access_token')) {  判断本地是否存在access_token
    if (user && user._id) { // 判断本地是否存在access_token
      next()
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  } else {
    next()
  }
  // 如果本地 存在 token 则 不允许直接跳转到 登录页面
  if (to.fullPath === '/login') {
    if (user && user._id) {
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
})
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
