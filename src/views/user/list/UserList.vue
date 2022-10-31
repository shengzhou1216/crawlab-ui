<template>
  <ClListLayout
    class="user-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :no-actions="noActions"
    :embedded="embedded"
    :selectable-function="selectableFunction"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateEditUserDialog/>
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import useUserList from './userList';
import CreateEditUserDialog from '@/components/user/CreateEditUserDialog.vue';

export default defineComponent({
  name: 'UserList',
  components: {
    ClListLayout,
    CreateEditUserDialog,
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
