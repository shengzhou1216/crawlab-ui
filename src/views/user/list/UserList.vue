<template>
  <ListLayout
    class="user-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :no-actions="noActions"
    :selectable-function="selectableFunction"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateEditUserDialog/>
      <!-- ./Dialogs -->
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ListLayout from '@/layouts/content/list/ListLayout.vue';
import useUserList from './userList';
import CreateEditUserDialog from '@/components/user/CreateEditUserDialog.vue';

export default defineComponent({
  name: 'UserList',
  components: {
    ListLayout,
    CreateEditUserDialog,
  },
  props: {
    noActions: {
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
      selectableFunction,
    } = useUserList();

    return {
      navActions,
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
      selectableFunction,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
