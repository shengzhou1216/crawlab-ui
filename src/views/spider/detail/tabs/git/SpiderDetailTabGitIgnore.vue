<template>
  <div class="git-ignore">
    <Table
        :columns="tableColumns"
        :data="tableData"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'vuex';
import Table from '@/components/table/Table.vue';

export default defineComponent({
  name: 'SpiderDetailTabGitIgnore',
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
    const tableData = computed<TableData<string>>(() => state.gitData.ignore || []);

    // table columns
    const tableColumns = computed<TableColumns<string>>(() => {
      return [
        {
          key: 'name',
          label: 'File',
          width: '1100',
          value: (row: string) => {
            return row;
          },
        },
      ] as TableColumns<string>;
    });

    return {
      tableData,
      tableColumns,
    };
  },
});
</script>

<style scoped lang="scss">
.git-ignore {
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>

<style scoped>
.git-ignore >>> .el-table {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
