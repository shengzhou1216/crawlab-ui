<template>
  <ClListLayout
    class="tag-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateTagDialog/>
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CreateTagDialog from '@/components/tag/CreateEditTagDialog.vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import useTagList from '@/views/tag/list/tagList';

export default defineComponent({
  name: 'TagList',
  components: {
    ClListLayout,
    CreateTagDialog,
  },
  setup() {
    const {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
    } = useTagList();

    return {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.tag-list {
  .nav-actions {
    border-bottom: none;
  }

  .content {
    background-color: $containerWhiteBg;
  }
}
</style>
