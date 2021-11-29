import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';
import useRequest from '@/services/request';
import {SETTING_PLUGIN} from '@/constants/setting';
import {PLUGIN_INSTALL_TYPE_NAME} from '@/constants/plugin';
import {plainClone} from '@/utils/object';

type Plugin = CPlugin;

const {
  get,
  post,
  getList,
} = useRequest();

const state = {
  ...getDefaultStoreState<Plugin>('plugin'),
  newFormFn: () => {
    return {
      install_type: PLUGIN_INSTALL_TYPE_NAME,
      auto_start: true,
    };
  },
  settings: {
    key: 'plugin',
    value: {
      baseUrl: '',
    },
  },
} as PluginStoreState;

const getters = {
  ...getDefaultStoreGetters<Plugin>(),
} as PluginStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<Plugin>(),
  setSettings: (state: PluginStoreState, settings: Setting) => {
    state.settings = plainClone(settings);
  },
  setSettingsByKey: (state: PluginStoreState, key: string, value: string) => {
    state.settings.value[key] = value;
  },
} as PluginStoreMutations;

const actions = {
  ...getDefaultStoreActions<Plugin>('/plugins'),
  getList: async ({state, commit}: StoreActionContext<PluginStoreState>) => {
    const payload = {
      ...state.tablePagination,
      conditions: JSON.stringify(state.tableListFilter),
      sort: JSON.stringify(state.tableListSort),
      status: true,
    };
    const res = await getList(`/plugins`, payload);
    commit('setTableData', {data: res.data || [], total: res.total});
    return res;
  },
  getSettings: async ({commit}: StoreActionContext<PluginStoreState>) => {
    const res = await get(`/settings/${SETTING_PLUGIN}`);
    if (!res?.data) return;
    commit('setSettings', res.data);
  },
  saveSettings: async ({state}: StoreActionContext<PluginStoreState>) => {
    await post(`/settings/${SETTING_PLUGIN}`, state.settings);
  },
} as PluginStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as PluginStoreModule;
