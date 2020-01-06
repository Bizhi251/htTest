<template>
  <div>
    <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
  </div>
</template>
<script>
import { Select } from 'ant-design-vue'
export default {
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    }
  },
  components: {
    ASelect: Select,
    ASelectOption: Select.option
  }
}
</script>
