<template>
  <div class="git-logs">
    <Table
        ref="tableRef"
        :data="tableData"
        :columns="tableColumns"
        height="100%"
        hide-footer
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, h} from 'vue';
import {useStore} from 'vuex';
import Table from '@/components/table/Table.vue';
import Time from '@/components/time/Time.vue';

export default defineComponent({
  name: 'SpiderDetailTabGitLogs',
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

    // table data
    const tableData = computed<TableData<GitLog>>(() => state.gitData.logs || []);

    // table columns
    const tableColumns = computed<TableColumns<GitLog>>(() => {
      return [
        {
          key: 'msg',
          label: 'Commit Message',
          width: '800',
        },
        {
          key: 'author',
          label: 'Author',
          width: '200',
          value: (row: GitLog) => {
            return `${row.author_name}${row.author_email ? (' (' + row.author_email + ')') : ''}`;
          },
        },
        {
          key: 'timestamp',
          label: 'Timestamp',
          width: '180',
          fixed: 'right',
          value: (row: GitLog) => {
            return h(Time, {time: row.timestamp, ago: false, format: 'YYYY-MM-DD hh:mm:ss A'});
          }
        }
      ] as TableColumns<GitLog>;
    });

    return {
      tableData,
      tableColumns,
    };
  },
});
</script>

<style scoped lang="scss">
.git-logs {
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>

<style scoped>
.git-logs >>> .el-table {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
