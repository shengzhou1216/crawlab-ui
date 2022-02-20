import {Module, GetterTree, MutationTree, ActionTree} from 'vuex';

declare global {
  interface CommonStoreModule extends Module<CommonStoreState, RootStoreState> {
    getters: CommonStoreGetters;
    mutations: CommonStoreMutations;
    actions: CommonStoreActions;
  }

  interface CommonStoreState {
    systemInfo?: SystemInfo;
  }

  type CommonStoreGetters = GetterTree<CommonStoreState, RootStoreState>;

  interface CommonStoreMutations extends MutationTree<CommonStoreState> {
    setSystemInfo: StoreMutation<CommonStoreState, SystemInfo>;
  }

  interface CommonStoreActions extends ActionTree<CommonStoreState, RootStoreState> {
    getSystemInfo: StoreAction<CommonStoreState>;
  }
}
