<template>
  <ListLayout
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :table-pagination="tablePagination"
    :action-functions="actionFunctions"
    no-actions
    :visible-buttons="['export', 'customize-columns']"
  >
    <template #extra>
      <Dialog
        :visible="dialogVisible"
        width="800px"
        @confirm="onDialogConfirm"
        @close="onDialogClose"
      >
        <DependencySettingForm
          :form="form"
          @change="onFormChange"
        />
      </Dialog>
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent, computed, ref, h} from 'vue';
import DependencySettingForm from './DependencySettingForm.vue';
import {ElMessage} from 'element-plus';
import NavLink from '@/components/nav/NavLink.vue';
import useRequest from '@/services/request';
import {translate} from '@/utils';
import ListLayout from '@/layouts/content/list/ListLayout.vue';
import Dialog from '@/components/dialog/Dialog.vue';

const endpoint = '/env/deps/settings';
const t = translate;

const {
  getList,
  put,
} = useRequest();

export default defineComponent({
  name: 'DependencySettings',
  components: {
    ListLayout,
    Dialog,
    DependencySettingForm,
  },
  setup() {
    const form = ref<EnvDepsSetting>({});

    const dialogVisible = ref(false);

    const tableColumns = computed(() => [
      {
        key: 'name',
        label: t('views.env.deps.settings.form.name'),
        icon: ['fa', 'font'],
        width: '150',
        value: (row: EnvDepsSetting) => h(NavLink, {
          label: row.name,
          path: `/dependencies/${row.key}`,
        }),
      },
      {
        key: 'cmd',
        label: t('views.env.deps.settings.form.cmd'),
        icon: ['fa', 'terminal'],
        width: '180',
        value: (row: EnvDepsSetting) => row.cmd,
      },
      {
        key: 'proxy',
        label: t('views.env.deps.settings.form.proxy'),
        icon: ['fa', 'globe'],
        width: '300',
        value: (row: EnvDepsSetting) => row.proxy,
      },
      {
        key: 'description',
        label: t('views.env.deps.settings.form.description'),
        icon: ['fa', 'comment-alt'],
        width: 'auto',
        value: (row: EnvDepsSetting) => t(`views.env.deps.settings.lang.${row.key}.description`),
      },
      {
        key: 'actions',
        label: t('components.table.columns.actions'),
        fixed: 'right',
        width: '200',
        buttons: [
          {
            type: 'warning',
            icon: ['fa', 'cog'],
            tooltip: t('common.actions.configure'),
            onClick: (row: EnvDepsSetting) => {
              form.value = {...row};
              dialogVisible.value = true;
            },
          },
        ],
        disableTransfer: true,
      },
    ]);

    const tableData = ref<TableData<EnvDepsSetting>>([]);

    const tablePagination = ref({
      page: 1,
      size: 10,
    });

    const tableTotal = ref(0);

    const actionFunctions = ref({
      getList: async () => {
        const res = await getList(`${endpoint}`, {
          ...tablePagination.value,
        });
        if (!res) {
          tableData.value = [];
          tableTotal.value = 0;
        }
        const {data, total} = res;
        tableData.value = data || [];
        tableTotal.value = total;
      },
    });

    const onDialogClose = () => {
      form.value = {};
      dialogVisible.value = false;
    };

    const onDialogConfirm = async () => {
      if (!form.value._id) return;
      await put(`${endpoint}/${form.value._id}`, form.value);
      await ElMessage.success(t('common.message.success.save'));
      form.value = {};
      dialogVisible.value = false;
      await actionFunctions.value.getList();
    };

    const onFormChange = (value: EnvDepsSetting) => {
      form.value = {...value};
    };

    return {
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
      dialogVisible,
      form,
      onDialogClose,
      onDialogConfirm,
      onFormChange,
      t,
    };
  },
});
</script>

<style scoped>

</style>
