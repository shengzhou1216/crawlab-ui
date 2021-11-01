<template>
  <div class="git-logs">
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
import Table from '@/components/table/Table.vue';
import Time from '@/components/time/Time.vue';
import Tag from '@/components/tag/Tag.vue';
import {GIT_REF_TYPE_BRANCH} from '@/constants/git';

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
          key: 'tag',
          label: 'Tag',
          width: '120',
          value: (row: GitLog) => {
            return row.refs?.map(r => h(Tag, {
              label: r.name,
              icon: r.type === GIT_REF_TYPE_BRANCH ? ['fa', 'code-branch'] : ['fa', 'tag'],
              effect: r.type === GIT_REF_TYPE_BRANCH ? 'dark' : 'light',
              type: r.type === GIT_REF_TYPE_BRANCH ? 'primary' : 'success',
              tooltip: `${r.type}: ${r.name}`
            } as TagProps))
          },
        },
        {
          key: 'msg',
          label: 'Commit Message',
          width: '680',
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
