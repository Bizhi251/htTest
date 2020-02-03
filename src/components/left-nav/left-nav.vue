<template>
  <div class="left-nav">
    <router-link to="/admin/" class="left-nav-header" replace>
      <img src='../../assets/images/logo.png' alt="logo"/>
      <h1>硅谷后台</h1>
    </router-link>
    <a-menu
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      style="width: 100%"
    >
      <a-menu-item v-for="menu in menuLists" :key="menu.key" :to="menu.key" >
        <router-link :to="'/admin'+menu.key">
          <a-icon :type="menu.icon" />
          <span >{{menu.title}}</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu v-for="menu in menucs" :key="menu.key" >
        <span slot="title"><a-icon :type="menu.icon" /><span>{{menu.title}}</span></span>
        <a-menu-item v-for="son in menu.children.filter(child =>  menus.indexOf(child.key)!==-1)" :key="son.key" :to="son.key">
          <router-link :to="'/admin'+son.key">
            <a-icon :type="son.icon" />
            <span>{{son.title}}</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import menuList from '../../config/menuConfig'
import { Menu, Icon } from 'ant-design-vue'
import memoryUtils from '../../utils/memoryUtils'
export default {

  mounted () {
    console.log(memoryUtils.user)
  },
  data () {
    return {
      collapsed: false,
      menuList,
      menus: memoryUtils.user.role.menus,
      username: memoryUtils.user.username
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    }
  },
  // 组件
  components: {
    AMenu: Menu,
    ASubMenu: Menu.SubMenu,
    AIcon: Icon,
    AMenuItem: Menu.Item
  },
  // 计算属性
  computed: {
    // 无子路由
    menuLists: function () {
      const that = this
      return this.menuList.filter(function (menu) {
        return (that.username === 'admin' || menu.isPublic || that.menus.indexOf(menu.key) !== -1) && !menu.children
      })
    },
    // 有子路由
    menucs: function () {
      const that = this
      return this.menuList.filter(function (menu) {
        return !menu.children ? false : menu.children.find(child => that.menus.indexOf(child.key) !== -1)
      })
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.left-nav {
  .left-nav-header {
    display: flex;
    align-items: center;
    height: 80px;
    background-color: #002140;
    img {
      margin: 0 15px;
      width: 40px;
      height: 40px;
    }

    h1 {
      color: white;
      font-size: 20px;
      margin-bottom: 0;
    }
  }
}
</style>
