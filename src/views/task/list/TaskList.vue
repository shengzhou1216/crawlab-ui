<template>
  <ClListLayout
    class="task-list"
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
      <CreateTaskDialog/>
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import useTaskList from '@/views/task/list/taskList';
import CreateTaskDialog from '@/components/task/CreateTaskDialog.vue';

export default defineComponent({
  name: 'TaskList',
  props: {
    noActions: {
      type: Boolean,
      default: false,
    },
    embedded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ClListLayout,
    CreateTaskDialog,
  },
  setup(props: TaskListProps, {emit}) {
    return {
      ...useTaskList(),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
