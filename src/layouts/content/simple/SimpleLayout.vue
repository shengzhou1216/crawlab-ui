<template>
  <div class="simple-layout" :style="{background}">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SimpleLayout',
  props: {
    background: {
      type: String,
      default: '#ffffff',
    }
  },
  setup() {
    return {};
  }
}
</script>

<style scoped lang="scss">
.simple-layout {
  padding: 20px;
  min-height: 100%;
}
</style>
