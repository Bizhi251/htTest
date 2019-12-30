import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

import { Button, Form, Icon, Input, Checkbox } from 'ant-design-vue'
Vue.use([Button, Form, Icon, Input, Checkbox])

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
