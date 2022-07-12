<template>
  <DetailLayout no-sidebar store-namespace="task">
    <template #actions>
      <TaskDetailActionsCommon/>
      <TaskDetailActionsLogs v-if="activeTabName === 'logs'"/>
      <TaskDetailActionsData v-if="activeTabName === 'data'"/>
    </template>
  </DetailLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import useTaskDetail from '@/views/task/detail/taskDetail';
import DetailLayout from '@/layouts/content/detail/DetailLayout.vue';
import TaskDetailActionsCommon from '@/views/task/detail/actions/TaskDetailActionsCommon.vue';
import TaskDetailActionsLogs from '@/views/task/detail/actions/TaskDetailActionsLogs.vue';
import TaskDetailActionsData from '@/views/task/detail/actions/TaskDetailActionsData.vue';

export default defineComponent({
  name: 'TaskDetail',
  components: {
    TaskDetailActionsData,
    TaskDetailActionsLogs,
    DetailLayout,
    TaskDetailActionsCommon,
  },
  setup() {
    return {
      ...useTaskDetail(),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
