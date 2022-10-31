<template>
  <ClListLayout
    class="token-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :no-actions="noActions"
    :embedded="embedded"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import useTokenList from '@/views/token/list/tokenList';

export default defineComponent({
  name: 'TokenList',
  props: {
    noActions: {
      type: Boolean,
      default: false,
    },
    embedded: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    ClListLayout,
  },
  setup() {
    return {
      ...useTokenList(),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
