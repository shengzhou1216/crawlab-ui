<template>
  <ClListLayout
    :action-functions="actionFunctions"
    :no-actions="noActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :visible-buttons="visibleButtons"
    :embedded="embedded"
    class="result-list"
  >
    <template #extra>
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, watch} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import {useStore} from 'vuex';
import {TABLE_ACTION_CUSTOMIZE_COLUMNS} from '@/constants';

export default defineComponent({
  name: 'ResultList',
  components: {
    ClListLayout,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    dataSourceId: {
      type: String,
      required: false,
    },
    noActions: {
      type: Boolean,
      default: false,
    },
    embedded: {
      type: Boolean,
      default: false,
    },
    visibleButtons: {
      type: Array as PropType<BuiltInTableActionButtonName[]>,
      default: () => {
        return [
          TABLE_ACTION_CUSTOMIZE_COLUMNS,
        ];
      }
    }
  },
  setup(props: ResultListProps) {
    // store
    const ns = 'dataCollection';
    const store = useStore();
    const {
      dataCollection: state,
    } = store.state as RootStoreState;

    // data
    const tableData = computed<TableData<Result>>(() => state.resultTableData);

    // total
    const tableTotal = computed<number>(() => state.resultTableTotal);

    // pagination
    const tablePagination = computed<TablePagination>(() => state.resultTablePagination);

    // columns
    const tableColumns = computed<TableColumns<Result>>(() => {
      const fields = store.getters[`${ns}/resultFields`] as ResultField[];
      return fields.map(f => {
        const {key} = f;
        return {
          key,
          label: key,
          minWidth: '240',
        };
      }) as TableColumns<Result>;
    });

    // action functions
    const actionFunctions = {
      setPagination: (pagination) => store.commit(`${ns}/setResultTablePagination`, pagination),
      getList: async () => {
        const {id} = props;
        if (!id) return;
        return store.dispatch(`${ns}/getResultData`, {
          id,
          params: {
            data_source_id: props.dataSourceId,
            ...tablePagination.value,
          },
        });
      },
      getAll: async () => {
        console.warn('getAll is not implemented');
      },
      deleteList: (ids: string[]) => {
        console.warn('deleteList is not implemented');
      },
      deleteByIdConfirm: (row: BaseModel) => {
        console.warn('deleteByIdConfirm is not implemented');
      },
    } as ListLayoutActionFunctions;

    const {
      getList,
    } = actionFunctions;

    watch(() => props.id, getList);

    watch(() => tablePagination.value, getList);

    return {
      actionFunctions,
      tableData,
      tableTotal,
      tablePagination,
      tableColumns,
    };
  },
});
</script>

<style lang="scss" scoped>
.result-list {
  .nav-actions {
    border-bottom: none;
  }
}
</style>
