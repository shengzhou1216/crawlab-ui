<template>
  <ClListLayout
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
    :table-pagination="tablePagination"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
  >
    <template #extra>
      <CreateEditDialog
        :visible="dialogVisible"
        width="1024px"
        no-batch
        @close="onDialogClose"
      >
        <NotificationForm
          :form="form"
        />
      </CreateEditDialog>
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent, computed, ref, h} from 'vue';
import {useRouter} from 'vue-router';
import {translate} from '@/utils';
import useRequest from '@/services/request';
import NotificationForm from '@/views/notification/NotificationForm.vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import CreateEditDialog from '@/components/dialog/CreateEditDialog.vue';
import NavLink from '@/components/nav/NavLink.vue';
import Switch from '@/components/switch/Switch.vue';

const t = translate;

const endpoint = '/notifications/settings';

const {
  getList,
  post,
} = useRequest();

const getDefaultForm = () => {
  return {
    type: 'mail',
    enabled: true,
  };
};

export default defineComponent({
  name: 'NotificationList',
  components: {
    ClListLayout,
    CreateEditDialog,
    NotificationForm,
  },
  setup() {
    const router = useRouter();

    const tableColumns = computed(() => [
      {
        key: 'name',
        label: t('views.notification.settings.form.name'),
        icon: ['fa', 'font'],
        width: '150',
        value: (row: NotificationSetting) => h(NavLink, {
          label: row.name,
          path: `/notifications/${row._id}`,
        }),
      },
      {
        key: 'type',
        label: t('views.notification.settings.form.type'),
        icon: ['fa', 'list'],
        width: '120',
        value: (row: NotificationSetting) => t(`views.notification.settings.type.${row.type}`)
      },
      {
        key: 'enabled',
        label: t('views.notification.settings.form.enabled'),
        icon: ['fa', 'toggle-on'],
        width: '120',
        value: (row: NotificationSetting) => h(Switch, {
          modelValue: row.enabled,
          onChange: async (value) => {
            if (!row._id) return;
            if (value.enabled) {
              await post(`${endpoint}/${row._id}/disable`);
            } else {
              await post(`${endpoint}/${row._id}/enable`);
            }
          },
        }),
      },
      {
        key: 'description',
        label: t('views.notification.settings.form.description'),
        icon: ['fa', 'comment-alt'],
        width: '800',
      },
      {
        key: 'actions',
        label: t('components.table.columns.actions'),
        fixed: 'right',
        width: '200',
        buttons: [
          {
            type: 'primary',
            icon: ['fa', 'search'],
            tooltip: t('common.actions.view'),
            onClick: (row: NotificationSetting) => {
              router.push(`/notifications/${row._id}`);
            },
          },
          // {
          //   type: 'info',
          //   size: 'mini',
          //   icon: ['fa', 'clone'],
          //   tooltip: 'Clone',
          //   onClick: (row) => {
          //     console.log('clone', row);
          //   }
          // },
          {
            type: 'danger',
            size: 'mini',
            icon: ['fa', 'trash-alt'],
            tooltip: t('common.actions.delete'),
            disabled: (row: NotificationSetting) => !!row.active,
            onClick: async (row: NotificationSetting) => {
              // const res = await ElMessageBox.confirm('Are you sure to delete?', 'Delete');
              // if (res) {
              // await deleteById(row._id as string);
              // }
              // await getList();
            },
          },
        ],
        disableTransfer: true,
      },
    ]);

    const tableData = ref<TableData<NotificationSetting>>([]);

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


    const form = ref(getDefaultForm());

    const dialogVisible = ref(false);

    const navActions = [
      {
        name: 'common',
        children: [
          {
            buttonType: 'label',
            label: t('views.notification.navActions.new.label'),
            tooltip: t('views.notification.navActions.new.tooltip'),
            icon: ['fa', 'plus'],
            type: 'success',
            onClick: () => {
              form.value = getDefaultForm();
              dialogVisible.value = true;
            }
          }
        ]
      }
    ];

    const onDialogClose = () => {
      dialogVisible.value = false;
      form.value = getDefaultForm();
    };

    return {
      tableColumns,
      tableData,
      tableTotal,
      tablePagination,
      actionFunctions,
      navActions,
      dialogVisible,
      form,
      onDialogClose,
      t,
    };
  },
});
</script>

<style scoped>

</style>
