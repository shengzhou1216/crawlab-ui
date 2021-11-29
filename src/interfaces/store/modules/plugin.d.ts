type PluginStoreModule = BaseModule<PluginStoreState, PluginStoreGetters, PluginStoreMutations, PluginStoreActions>;

interface PluginStoreState extends BaseStoreState<CPlugin> {
  settings: Setting;
}

type PluginStoreGetters = BaseStoreGetters<CPlugin>;

interface PluginStoreMutations extends BaseStoreMutations<CPlugin> {
  setSettings: StoreMutation<BaseStoreState<CPlugin>, Setting>;
  setSettingsByKey: StoreMutation<BaseStoreState<CPlugin>, string, string>;
}

interface PluginStoreActions extends BaseStoreActions<CPlugin> {
  getSettings: StoreAction<BaseStoreState>;
  saveSettings: StoreAction<BaseStoreState>;
}
