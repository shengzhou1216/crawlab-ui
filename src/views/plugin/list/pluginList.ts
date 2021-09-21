import useList from '@/layouts/list';
import {useStore} from 'vuex';
import {getDefaultUseListOptions, setupListComponent} from '@/utils/list';
import {computed, h} from 'vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {ElMessage, ElMessageBox} from 'element-plus';
import usePluginService from '@/services/plugin/pluginService';
import NavLink from '@/components/nav/NavLink.vue';
import {useRouter} from 'vue-router';
import useRequest from '@/services/request';
import {
  PLUGIN_STATUS_INSTALL_ERROR,
  PLUGIN_STATUS_INSTALLING,
  PLUGIN_STATUS_RUNNING,
  PLUGIN_STATUS_STOPPED
} from '@/constants/plugin';
import PluginStatus from '@/components/plugin/PluginStatus.vue';

type Plugin = CPlugin;

const {
  post,
} = useRequest();

const usePluginList = () => {
  // router
  const router = useRouter();

  // store
  const ns = 'plugin';
  const store = useStore<RootStoreState>();
  const {commit} = store;

  // services
  const {
    getList,
    deleteById,
  } = usePluginService(store);

  // nav actions
  const navActions = computed<ListActionGroup[]>(() => [
    {
      name: 'common',
      children: [
        {
          buttonType: 'label',
          label: 'New Plugin',
          tooltip: 'New Plugin',
          icon: ['fa', 'plus'],
          type: 'success',
          onClick: () => {
            commit(`${ns}/showDialog`, 'create');
          }
        }
      ]
    }
  ]);

  // table columns
  const tableColumns = computed<TableColumns<Plugin>>(() => [
    {
      key: 'name', // name
      label: 'Name',
      icon: ['fa', 'font'],
      width: '150',
      value: (row: Plugin) => h(NavLink, {
        path: `/plugins/${row._id}`,
        label: row.name,
      }),
      hasSort: true,
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: 'status',
      label: 'Status',
      icon: ['fa', 'check-square'],
      width: '120',
      value: (row: Plugin) => {
        return h(PluginStatus, {status: row.status, error: row.error} as PluginStatusProps);
      },
    },
    {
      key: 'pid',
      label: 'Process ID',
      icon: ['fa', 'microchip'],
      width: '120',
    },
    {
      key: 'description',
      label: 'Description',
      icon: ['fa', 'comment-alt'],
      width: 'auto',
      hasFilter: true,
      allowFilterSearch: true,
    },
    {
      key: TABLE_COLUMN_NAME_ACTIONS,
      label: 'Actions',
      fixed: 'right',
      width: '200',
      buttons: (row: Plugin) => [
        ((): TableColumnButton => {
          switch (row.status) {
            case PLUGIN_STATUS_RUNNING:
              return {
                type: 'info',
                size: 'mini',
                icon: ['fa', 'stop'],
                tooltip: 'Stop',
                onClick: async (row) => {
                  await ElMessageBox.confirm('Are you sure to stop?', 'Stop', {type: 'warning'});
                  await ElMessage.info('Attempt to stop');
                  await post(`/plugins/${row._id}/stop`);
                  await store.dispatch(`${ns}/getList`);
                },
              };
            case PLUGIN_STATUS_INSTALL_ERROR:
              return {
                type: 'primary',
                size: 'mini',
                icon: ['fa', 'play'],
                tooltip: 'Install',
                onClick: async (row) => {
                  await ElMessageBox.confirm('Are you sure to install?', 'Install', {type: 'warning'});
                  await post(`/plugins/${row._id}/install`);
                  await ElMessage.success(' Installing plugin');
                  await store.dispatch(`${ns}/getList`);
                },
              };
            default:
              return {
                type: 'success',
                size: 'mini',
                icon: ['fa', 'play'],
                tooltip: 'Run',
                disabled: (row) => row.status === PLUGIN_STATUS_INSTALLING,
                onClick: async (row) => {
                  await ElMessageBox.confirm('Are you sure to run?', 'Run', {type: 'warning'});
                  await post(`/plugins/${row._id}/run`);
                  await ElMessage.success(' Started plugin successfully');
                  await store.dispatch(`${ns}/getList`);
                },
              };
          }
        })(),
        {
          type: 'primary',
          icon: ['fa', 'search'],
          tooltip: 'View',
          onClick: (row) => {
            router.push(`/plugins/${row._id}`);
          },
        },
        {
          type: 'danger',
          size: 'mini',
          icon: ['fa', 'trash-alt'],
          tooltip: 'Delete',
          disabled: (row: Plugin) => !!row.active,
          onClick: async (row: Plugin) => {
            const res = await ElMessageBox.confirm('Are you sure to delete?', 'Delete');
            if (res) {
              await deleteById(row._id as string);
            }
            await getList();
          },
        },
      ],
      disableTransfer: true,
    }
  ]);

  // options
  const opts = getDefaultUseListOptions<Plugin>(navActions, tableColumns);

  // init
  setupListComponent(ns, store, []);

  return {
    ...useList<Plugin>(ns, store, opts)
  };
};

export default usePluginList;
