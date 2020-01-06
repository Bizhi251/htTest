<template>
  <div id='app' >
    <router-view style="height: 100%"/>
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
  #app
    {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
    }
</style>
