import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';
import {getNewPlugin} from '@/components/plugin/plugin';
import useRequest from '@/services/request';

type Plugin = CPlugin;

const {
  getList,
} = useRequest();

const state = {
  ...getDefaultStoreState<Plugin>('plugin'),
  form: getNewPlugin(),
} as PluginStoreState;

const getters = {
  ...getDefaultStoreGetters<Plugin>(),
} as PluginStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<Plugin>(),
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
} as PluginStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as PluginStoreModule;
