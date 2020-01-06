<template>
  <div id="components-layout-demo-basic">
    <a-layout style="height: 100%">
      <a-layout-sider>
        <LeftNav/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="height: 80px; padding: 0px">
          <Header/>
        </a-layout-header>
        <a-layout-content style="background: #7dbcea">
          <router-view/>
        </a-layout-content>
        <a-layout-footer>推荐使用谷歌浏览器，可以获得更佳页面操作体验</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import { Layout } from 'ant-design-vue'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
export default {
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  },
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutFooter: Layout.Footer,
    ALayoutSider: Layout.Sider,
    LeftNav,
    Header
  }
}
</script>
<style>
  #components-layout-demo-basic {
    text-align: center;
  }
  #components-layout-demo-basic .ant-layout-header,
  #components-layout-demo-basic .ant-layout-footer {
    background: #7dbcea;
    color: #fff;
  }
  /*#components-layout-demo-basic .ant-layout-footer {*/
  /*  line-height: 1.5;*/
  /*}*/
  #components-layout-demo-basic .ant-layout-sider {
    /*background: #3ba0e9;*/
    color: #fff;
    background-color: #002140;
    line-height: 120px;
  }
  #components-layout-demo-basic .ant-layout-content {
    background: rgba(16, 142, 233, 1);
    color: #fff;
    min-height: 120px;
    line-height: 120px;
  }
  /*#components-layout-demo-basic > .ant-layout {*/
  /*  margin-bottom: 48px;*/
  /*}*/
  /*#components-layout-demo-basic > .ant-layout:last-child {*/
  /*  margin: 0;*/
  /*}*/
</style>
