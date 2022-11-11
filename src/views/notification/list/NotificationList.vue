<template>
  <ClListLayout
    class="notification-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateEditNotificationDialog/>
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import CreateEditNotificationDialog from '@/components/notification/CreateEditNotificationDialog.vue';
import useNotificationList from '@/views/notification/list/useNotificationList';

export default defineComponent({
  name: 'NotificationList',
  components: {
    ClListLayout,
    CreateEditNotificationDialog,
  },
  setup() {
    const {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      tableListFilter,
      tableListSort,
      actionFunctions,
      activeDialogKey,
    } = useNotificationList();

    return {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      tableListFilter,
      tableListSort,
      actionFunctions,
      activeDialogKey,
    };
  },
});
</script>

<style scoped>

</style>
