import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';
import {getNewPlugin} from '@/components/plugin/plugin';

type Plugin = CPlugin;

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
} as PluginStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as PluginStoreModule;
