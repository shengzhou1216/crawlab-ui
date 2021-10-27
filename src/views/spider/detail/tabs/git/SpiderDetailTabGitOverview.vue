<template>
  <div class="git-overview">
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, h, ref} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'SpiderDetailTabGitOverview',
  components: {
  },
  setup() {
    // store
    const ns = 'spider';
    const store = useStore();
    const {
      spider: state,
    } = store.state as RootStoreState;

    return {
    };
  },
});
</script>

<style scoped lang="scss">
.git-overview {
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>

<style scoped>
.git-overview >>> .el-table {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
