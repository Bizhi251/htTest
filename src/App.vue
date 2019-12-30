<template>
  <div id='app' class="app">
<!--    <a-button @click="goTo('/login')">APP</a-button>-->
    <router-view class="app"/>
<!--    <FooterGuide v-show="$route.meta.showFooter"/>-->
  </div>
</template>

<script>
export default {
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .app
    {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
    }
</style>
