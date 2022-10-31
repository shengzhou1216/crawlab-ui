<template>
  <ClListLayout
    class="node-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :visible-buttons="visibleButtons"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateEditNodeDialog/>
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import useNodeList from '@/views/node/list/nodeList';
import CreateEditNodeDialog from '@/components/node/CreateEditNodeDialog.vue';

export default defineComponent({
  name: 'NodeList',
  components: {
    ClListLayout,
    CreateEditNodeDialog,
  },
  setup() {
    return {
      ...useNodeList(),
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
