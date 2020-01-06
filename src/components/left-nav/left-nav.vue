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
        <a-menu-item v-for="son in menu.children" :key="son.key" :to="son.key">
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
export default {
  data () {
    return {
      collapsed: false,
      menuList
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
      return this.menuList.filter(function (menu) {
        return !menu.children
      })
    },
    // 有子路由
    menucs: function () {
      return this.menuList.filter(function (menu) {
        return !!menu.children
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
