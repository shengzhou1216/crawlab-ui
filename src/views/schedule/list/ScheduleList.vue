<template>
  <ClListLayout
    class="schedule-list"
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
      <CreateEditScheduleDialog/>
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import useScheduleList from './scheduleList';
import CreateEditScheduleDialog from '@/components/schedule/CreateEditScheduleDialog.vue';

export default defineComponent({
  name: 'ScheduleList',
  components: {
    ClListLayout,
    CreateEditScheduleDialog,
  },
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
  setup() {
    const {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
    } = useScheduleList();

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

</style>
