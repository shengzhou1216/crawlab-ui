<template>
  <div class="demo-layout">
    <el-tabs :active-name="activeName">
      <slot/>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DemoLayout',
  props: {
    activeName: {
      type: String,
    }
  },
  setup(props: DemoLayoutProps) {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.demo-layout {
  height: 100%;
  background-color: #ffffff;
}
</style>

<style scoped>
.demo-layout >>> .el-tabs .el-tabs__header {
  margin: 0;
}
</style>
