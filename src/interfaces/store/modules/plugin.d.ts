type PluginStoreModule = BaseModule<PluginStoreState, PluginStoreGetters, PluginStoreMutations, PluginStoreActions>;

interface PluginStoreState extends BaseStoreState<CPlugin> {
  baseUrl: string;
}

type PluginStoreGetters = BaseStoreGetters<CPlugin>;

interface PluginStoreMutations extends BaseStoreMutations<CPlugin> {
  setBaseUrl: StoreMutation<BaseStoreState<CPlugin>, string>;
}

interface PluginStoreActions extends BaseStoreActions<CPlugin> {
  getBaseUrl: StoreAction<BaseStoreState>;
  saveBaseUrl: StoreAction<BaseStoreState, string>;
}
