<template>
  <ListLayout
    class="spider-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :table-actions-prefix="tableActionsPrefix"
    :no-actions="noActions"
    :embedded="embedded"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateSpiderDialog/>
      <RunSpiderDialog/>
      <UploadSpiderFilesDialog/>
      <!-- ./Dialogs -->
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CreateSpiderDialog from '@/components/spider/CreateEditSpiderDialog.vue';
import ListLayout from '@/layouts/content/list/ListLayout.vue';
import useSpiderList from '@/views/spider/list/spiderList';
import RunSpiderDialog from '@/components/spider/RunSpiderDialog.vue';
import UploadSpiderFilesDialog from '@/components/spider/UploadSpiderFilesDialog.vue';

export default defineComponent({
  name: 'SpiderList',
  props: {
    noActions: {
      type: Boolean,
      required: false
    },
    embedded: {
      type: Boolean,
      required: false
    }
  },
  components: {
    UploadSpiderFilesDialog,
    RunSpiderDialog,
    ListLayout,
    CreateSpiderDialog,
  },
  setup() {
    const {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
      tableActionsPrefix,
      activeDialogKey,
    } = useSpiderList();

    return {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
      tableActionsPrefix,
      activeDialogKey,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.spider-list {
  .nav-actions {
    border-bottom: none;
  }

  .content {
    background-color: $containerWhiteBg;
  }
}
</style>
