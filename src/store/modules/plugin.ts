import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';
import {getNewPlugin} from '@/components/plugin/plugin';
import useRequest from '@/services/request';
import {SETTING_PLUGIN_BASE_URL} from '@/constants/setting';

type Plugin = CPlugin;

const {
  get,
  post,
  getList,
} = useRequest();

const state = {
  ...getDefaultStoreState<Plugin>('plugin'),
  form: getNewPlugin(),
  baseUrl: '',
} as PluginStoreState;

const getters = {
  ...getDefaultStoreGetters<Plugin>(),
} as PluginStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<Plugin>(),
  setBaseUrl: (state: PluginStoreState, baseUrl: string) => {
    state.baseUrl = baseUrl;
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
  getBaseUrl: async ({commit}: StoreActionContext<PluginStoreState>) => {
    const res = await get(`/settings/${SETTING_PLUGIN_BASE_URL}`);
    if (!res?.data) return;
    commit('setBaseUrl', res.data.value);
  },
  saveBaseUrl: async ({state}: StoreActionContext<PluginStoreState>, value: string) => {
    await post(`/settings/${SETTING_PLUGIN_BASE_URL}`, JSON.stringify(value));
  },
} as PluginStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as PluginStoreModule;
