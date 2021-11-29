import {computed, readonly} from 'vue';
import {Store, useStore} from 'vuex';
import useForm from '@/components/form/form';
import usePluginService from '@/services/plugin/pluginService';
import {getDefaultFormComponentData} from '@/utils/form';
import {getPluginBaseUrlOptions} from '@/utils/plugin';

type Plugin = CPlugin;

// form component data
const formComponentData = getDefaultFormComponentData<Plugin>();

const usePlugin = (store: Store<RootStoreState>) => {
  // store
  const ns = 'plugin';
  const {
    plugin: state
  } = store.state as RootStoreState;

  // form rules
  const formRules = readonly<FormRules>({});

  // base url options
  const baseUrlOptions = getPluginBaseUrlOptions();

  // settings
  const settings = computed<{ [key: string]: string }>(() => state.settings);

  return {
    ...useForm(ns, store, usePluginService(store), formComponentData),
    formRules,
    baseUrlOptions,
    settings,
  };
};

export default usePlugin;
