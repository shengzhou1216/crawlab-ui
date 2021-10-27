import useList from '@/layouts/list';
import {useStore} from 'vuex';
import {getDefaultUseListOptions, setupListComponent} from '@/utils/list';
import {computed, h, onBeforeMount, ref} from 'vue';
import {TABLE_COLUMN_NAME_ACTIONS} from '@/constants/table';
import {ElMessage, ElMessageBox} from 'element-plus';
import usePluginService from '@/services/plugin/pluginService';
import NavLink from '@/components/nav/NavLink.vue';
import {useRouter} from 'vue-router';
import useRequest from '@/services/request';
import {
  PLUGIN_DEPLOY_MODE_ALL,
  PLUGIN_DEPLOY_MODE_MASTER, PLUGIN_STATUS_ERROR,
  PLUGIN_STATUS_INSTALL_ERROR,
  PLUGIN_STATUS_INSTALLING,
  PLUGIN_STATUS_RUNNING,
  PLUGIN_STATUS_STOPPED
} from '@/constants/plugin';
import PluginStatus from '@/components/plugin/PluginStatus.vue';
import PluginStatusMultiNode from '@/components/plugin/PluginStatusMultiNode.vue';
import PluginPid from '@/components/plugin/PluginPid.vue';
import {SETTING_PLUGIN_BASE_URL_GITEE, SETTING_PLUGIN_BASE_URL_GITHUB} from '@/constants/setting';

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
  const {
    plugin: state,
  } = store.state;

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
        if (row.deploy_mode === PLUGIN_DEPLOY_MODE_MASTER || row.status?.length === 1) {
          const status = row.status?.[0];
          return h(PluginStatus, {...status} as PluginStatusProps);
        } else if (row.deploy_mode === PLUGIN_DEPLOY_MODE_ALL) {
          return h(PluginStatusMultiNode, {status: row.status} as PluginStatusMultiNodeProps);
        }
      },
    },
    {
      key: 'pid',
      label: 'Process ID',
      icon: ['fa', 'microchip'],
      width: '120',
      value: (row: Plugin) => {
        return h(PluginPid, {status: row.status} as PluginPidProps);
      },
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
      buttons: (row: Plugin) => {
        let buttons: TableColumnButton[];

        buttons = [
          {
            type: 'success',
            icon: ['fa', 'play'],
            tooltip: 'Start',
            onClick: async (row) => {
              await ElMessageBox.confirm('Are you sure to start?', 'Start', {type: 'warning'});
              await post(`/plugins/${row._id}/start`);
              await ElMessage.success(' Started plugin successfully');
              await store.dispatch(`${ns}/getList`);
            },
            disabled: (row: Plugin) => {
              if (row.status?.length === 1) {
                return [
                  PLUGIN_STATUS_INSTALLING,
                  PLUGIN_STATUS_RUNNING,
                ].includes(row.status[0].status);
              } else if (row.status) {
                for (const s of row.status) {
                  if ([
                    PLUGIN_STATUS_INSTALL_ERROR,
                    PLUGIN_STATUS_STOPPED,
                    PLUGIN_STATUS_ERROR,
                  ].includes(s.status)) {
                    return false;
                  }
                }
                return true;
              } else {
                return true;
              }
            },
          },
          {
            type: 'info',
            size: 'mini',
            icon: ['fa', 'stop'],
            tooltip: 'Stop',
            onClick: async (row) => {
              await ElMessageBox.confirm('Are you sure to stop?', 'Stop', {type: 'warning'});
              await ElMessage.info('Attempt to stop');
              await post(`/plugins/${row._id}/stop`);
              await store.dispatch(`${ns}/getList`);
            }, disabled: (row: Plugin) => {
              if (row.status?.length === 1) {
                return [
                  PLUGIN_STATUS_INSTALL_ERROR,
                  PLUGIN_STATUS_STOPPED,
                  PLUGIN_STATUS_ERROR,
                ].includes(row.status[0].status);
              } else if (row.status) {
                for (const s of row.status) {
                  if ([
                    PLUGIN_STATUS_INSTALLING,
                    PLUGIN_STATUS_RUNNING,
                  ].includes(s.status)) {
                    return false;
                  }
                }
                return true;
              } else {
                return true;
              }
            },
          },
        ];

        // default
        buttons = buttons.concat([
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
        ]);
        return buttons;
      },
      disableTransfer: true,
    }
  ]);

  // options
  const opts = getDefaultUseListOptions<Plugin>(navActions, tableColumns);

  // init
  setupListComponent(ns, store, []);

  const baseUrl = ref<string>();

  onBeforeMount(async () => {
    // get base url
    await store.dispatch(`${ns}/getBaseUrl`);
    baseUrl.value = state.baseUrl;
  });

  const saveBaseUrl = async (value: string) => {
    await store.dispatch(`${ns}/saveBaseUrl`, value);
  };

  const baseUrlOptions = [
    {value: SETTING_PLUGIN_BASE_URL_GITHUB, label: 'Github'},
    {value: SETTING_PLUGIN_BASE_URL_GITEE, label: 'Gitee'},
  ];

  const onBaseUrlChange = async (value: string) => {
    await saveBaseUrl(value);
  };

  return {
    ...useList<Plugin>(ns, store, opts),
    saveBaseUrl,
    baseUrlOptions,
    baseUrl,
    onBaseUrlChange,
  };
};

export default usePluginList;
