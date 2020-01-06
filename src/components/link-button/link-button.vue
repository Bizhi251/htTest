<template>
  <button @click="childMethod" class="link-button">
    <slot/>
  </button>
</template>

<script>
export default {
  methods: {
    childMethod () {
      this.$emit('logout')
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .link-button {
    background-color: transparent;
    border: none;
    outline: none;
    color: #1da57a;
    cursor: pointer;
  }
</style>
