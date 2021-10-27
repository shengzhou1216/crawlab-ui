<template>
  <div class="git-changes">
    <Table
        ref="tableRef"
        :data="tableData"
        :columns="tableColumns"
        height="100%"
        selectable
        hide-footer
        @selection-change="onSelectionChange"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, h, ref, watch} from 'vue';
import {useStore} from 'vuex';
import Table from '@/components/table/Table.vue';
import GitFileStatus from '@/components/git/GitFileStatus.vue';
import Tag from '@/components/tag/Tag.vue';

export default defineComponent({
  name: 'SpiderDetailTabGitChanges',
  components: {
    Table,
  },
  setup() {
    // store
    const ns = 'spider';
    const store = useStore();
    const {
      spider: state,
    } = store.state as RootStoreState;

    const getStatusTagProps = (status?: string): TagProps => {
      const label = status;
      switch (status) {
        case '?':
          return {type: 'danger', tooltip: 'Untracked', label};
        case 'M':
          return {type: 'primary', tooltip: 'Modified', label};
        case 'A':
          return {type: 'success', tooltip: 'Added', label};
        case 'D':
          return {type: 'info', tooltip: 'Deleted', label};
        case 'R':
          return {type: 'primary', tooltip: 'Renamed', label};
        case 'C':
          return {type: 'primary', tooltip: 'Copied', label};
        case 'U':
          return {type: 'danger', tooltip: 'Updated but unmerged', label};
        default:
          return {label};
      }
    };

    // table ref
    const tableRef = ref<typeof Table>();

    // table data
    const tableData = computed<TableData<GitChange>>(() => state.gitData.changes || []);

    // table columns
    const tableColumns = computed<TableColumns<GitChange>>(() => {
      return [
        {
          key: 'changed_file',
          label: 'Changed File',
          width: '1000',
          value: (row: GitChange) => {
            return h(GitFileStatus, {fileStatus: row});
          },
        },
        {
          key: 'status',
          label: 'Status',
          width: '50',
          value: (row: GitChange) => {
            return h(Tag, getStatusTagProps(row.worktree));
          },
        },
        {
          key: '',
          label: '',
          fixed: 'right',
          width: '100',
        }
      ] as TableColumns<GitChange>;
    });

    const onSelectionChange = (rows: TableData<GitChange>) => {
      store.commit(`${ns}/setGitChangeSelection`, rows);
    };

    watch(() => tableData.value, () => tableRef.value?.clearSelection());

    return {
      tableRef,
      tableData,
      tableColumns,
      onSelectionChange,
    };
  },
});
</script>

<style scoped lang="scss">
.git-changes {
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>

<style scoped>
.git-changes >>> .el-table {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
