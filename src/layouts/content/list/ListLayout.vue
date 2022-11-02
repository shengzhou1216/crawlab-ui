<template>
  <div class="list-layout">
    <div class="content">
      <!-- Nav Actions -->
      <NavActions v-if="!noActions" ref="navActions" class="nav-actions">
        <NavActionGroup
          v-for="(grp, i) in navActions"
          :key="grp.name || i"
        >
          <NavActionItem
            v-for="(item, j) in grp.children"
            :key="`${grp.name}-${item.id || j}`"
          >
            <template v-if="item.action === ACTION_FILTER_SEARCH">
              <FilterInput
                :placeholder="item.placeholder"
                @change="(value) => item?.onChange(value)"
              />
            </template>
            <template v-else-if="item.action === ACTION_FILTER_SELECT">
              <FilterSelect
                :label="item.label"
                :placeholder="item.placeholder"
                :options="item.options"
                :options-remote="item.optionsRemote"
                @change="(value) => item?.onChange(value)"
              />
            </template>
            <template v-else>
              <NavActionButton
                v-auth="ACTION_ADD"
                :id="item.id"
                :class-name="item.className"
                :button-type="item.buttonType"
                :disabled="item.disabled"
                :icon="item.icon"
                :label="item.label"
                :size="item.size"
                :tooltip="item.tooltip"
                :type="item.type"
                @click="item.onClick"
              />
            </template>
          </NavActionItem>
        </NavActionGroup>
        <slot name="nav-actions-extra"></slot>
      </NavActions>
      <!-- ./Nav Actions -->

      <!-- Table -->
      <ClTable
        ref="tableRef"
        :key="tableColumnsHash"
        :columns="tableColumns"
        :data="tableData"
        :total="tableTotal"
        :page="tablePagination.page"
        :page-size="tablePagination.size"
        selectable
        :selectable-function="selectableFunction"
        :visible-buttons="visibleButtons"
        :pagination-layout="tablePaginationLayout"
        :loading="tableLoading"
        :embedded="embedded"
        @selection-change="onSelect"
        @delete="onDelete"
        @edit="onEdit"
        @pagination-change="onPaginationChange"
        @header-change="onHeaderChange"
      >
        <template #actions-prefix>
          <NavActionButton
            v-for="(btn, $index) in tableActionsPrefix"
            :key="$index"
            :button-type="btn.buttonType"
            :disabled="getNavActionButtonDisabled(btn)"
            :icon="btn.icon"
            :label="btn.label"
            :size="btn.size"
            :tooltip="btn.tooltip"
            :type="btn.type"
            @click="btn.onClick"
          />
        </template>
        <template #actions-suffix>
          <NavActionButton
            v-for="(btn, $index) in tableActionsSuffix"
            :key="$index"
            :button-type="btn.buttonType"
            :disabled="btn.disabled"
            :icon="btn.icon"
            :label="btn.label"
            :size="btn.size"
            :tooltip="btn.tooltip"
            :type="btn.type"
            @click="btn.onClick"
          />
        </template>
      </ClTable>
      <!-- ./Table -->
    </div>

    <slot name="extra"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, PropType, provide, ref, SetupContext, toRefs, watch} from 'vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import Table from '@/components/table/Table.vue';
import NavActionButton from '@/components/nav/NavActionButton.vue';
import NavActions from '@/components/nav/NavActions.vue';
import FilterSelect from '@/components/filter/FilterSelect.vue';
import {emptyArrayFunc, emptyObjectFunc} from '@/utils/func';
import {getMd5} from '@/utils/hash';
import {ACTION_ADD, ACTION_FILTER_SEARCH, ACTION_FILTER_SELECT} from '@/constants/action';
import FilterInput from '@/components/filter/FilterInput.vue';

export default defineComponent({
  name: 'ListLayout',
  components: {
    FilterInput,
    FilterSelect,
    NavActions,
    NavActionGroup,
    NavActionItem,
    NavActionButton,
    ClTable: Table,
  },
  props: {
    navActions: {
      type: Array as PropType<ListActionGroup[]>,
      default: () => {
        return [];
      }
    },
    tableColumns: {
      type: Array as PropType<TableColumns>,
      default: () => {
        return [];
      }
    },
    tableData: {
      type: Array as PropType<TableData>,
      default: () => {
        return [];
      }
    },
    tableTotal: {
      type: Number,
      default: 0,
    },
    tablePagination: {
      type: Object as PropType<TablePagination>,
      default: () => {
        return {
          page: 1,
          size: 10,
        };
      }
    },
    tableListFilter: {
      type: Array as PropType<FilterConditionData[]>,
      default: emptyArrayFunc,
    },
    tableListSort: {
      type: Array as PropType<SortData[]>,
      default: emptyArrayFunc,
    },
    tableActionsPrefix: {
      type: Array as PropType<ListActionButton[]>,
      default: () => {
        return [];
      }
    },
    tableActionsSuffix: {
      type: Array as PropType<ListActionButton[]>,
      default: () => {
        return [];
      }
    },
    tableFilter: {},
    actionFunctions: {
      type: Object as PropType<ListLayoutActionFunctions>,
      default: emptyObjectFunc,
    },
    noActions: {
      type: Boolean,
      default: false,
    },
    selectableFunction: {
      type: Function as PropType<TableSelectableFunction>,
      default: () => true,
    },
    visibleButtons: {
      type: Array as PropType<BuiltInTableActionButtonName[]>,
      required: false,
      default: () => {
        return [];
      }
    },
    tablePaginationLayout: {
      type: String,
      required: false,
    },
    tableLoading: {
      type: Boolean,
      required: false,
    },
    tablePaginationPosition: {
      type: String as PropType<TablePaginationPosition>,
      required: false,
    },
    embedded: {
      type: Boolean,
      required: false,
    },
  },
  emits: [
    'select',
    'edit',
    'delete',
  ],
  setup(props: ListLayoutProps, {emit}: SetupContext) {
    const {
      actionFunctions,
    } = toRefs(props);

    const {
      setPagination,
      getList,
      onHeaderChange,
    } = actionFunctions.value;

    const tableRef = ref();

    const computedTableRef = computed<typeof Table>(() => tableRef.value);

    const onSelect = (value: TableData) => {
      emit('select', value);
    };

    const onEdit = (value: TableData) => {
      emit('edit', value);
    };

    const onDelete = (value: TableData) => {
      emit('delete', value);
    };

    const onPaginationChange = (value: TablePagination) => {
      setPagination(value);
    };

    // get list when table pagination changes
    watch(() => props.tablePagination, getList);

    // get list before mount
    onBeforeMount(() => {
      getList();
    });

    provide<ListLayoutActionFunctions>('action-functions', actionFunctions.value);

    const getNavActionButtonDisabled = (btn: ListActionButton) => {
      if (typeof btn.disabled === 'boolean') {
        return btn.disabled;
      } else if (typeof btn.disabled === 'function') {
        return btn.disabled(computedTableRef.value);
      } else {
        return false;
      }
    };

    const tableColumnsHash = computed<string>(() => {
      const {tableColumns} = props;
      return getMd5(JSON.stringify(tableColumns));
    });

    return {
      tableRef,
      tableColumnsHash,
      onSelect,
      onPaginationChange,
      onHeaderChange,
      onEdit,
      onDelete,
      getNavActionButtonDisabled,
      ACTION_ADD,
      ACTION_FILTER_SEARCH,
      ACTION_FILTER_SELECT,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";

.list-layout {
  .nav-actions {
    background-color: $containerWhiteBg;
    border-bottom: none;

    .nav-action-group {
      .nav-action-item {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }

  .content {
    background-color: $containerWhiteBg;
  }
}
</style>
<style scoped>
.list-layout >>> .tag {
  margin-right: 10px;
}

</style>
