<template>
  <div class="git-branches">
    <Table
        :data="tableData"
        :columns="tableColumns"
        height="calc(100% - 1px)"
        hide-footer
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, h} from 'vue';
import {useStore} from 'vuex';
import Time from '@/components/time/Time.vue';
import Table from '@/components/table/Table.vue';

export default defineComponent({
  name: 'SpiderDetailTabGitBranches',
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
    const tableData = computed<TableData<GitRef>>(() => state.gitData.branches || []);

    const gitLogsMap = computed<Map<string, GitLog>>(() => store.getters[`${ns}/gitLogsMap`] as Map<string, GitLog>);

    // table columns
    const tableColumns = computed<TableColumns<GitLog>>(() => {
      return [
        {
          key: 'name',
          label: 'Name',
          width: '800',
        },
        {
          key: 'timestamp',
          label: 'Timestamp',
          width: '180',
          fixed: 'right',
          value: (row: GitLog) => {
            if (!row.hash) return;
            const l = gitLogsMap.value.get(row.hash);
            if (!l?.timestamp) return;
            return h(Time, {time: l.timestamp, ago: false, format: 'YYYY-MM-DD hh:mm:ss A'});
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
.git-branches {
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>

<style scoped>
.git-branches >>> .el-table {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
