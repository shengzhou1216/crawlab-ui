import {createApp as createVueApp, App as VueApp} from 'vue';
import ElementPlus from 'element-plus';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import {createStore} from '@/store';
import i18n from '@/i18n';
import {initBaiduTonji} from '@/admin/baidu';
import {importScripts, importStylesheets} from '@/package/utils';
import {createRouter} from '@/router';

export const getDefaultCreateAppOptions = (): CreateAppOptions => {
  return {
    initStylesheet: true,
    initScripts: true,
    initBaiduTongji: true,
    loadStore: true,
    loadRouter: true,
    loadElementPlus: true,
    loadI18n: true,
    loadFontAwesome: true,
    mount: true,
  };
};

const createApp = (options?: CreateAppOptions): VueApp => {
  options = {
    ...getDefaultCreateAppOptions(),
    ...options,
  };

  // import stylesheets
  if (options.initStylesheet) importStylesheets();

  // import scripts
  if (options.initScripts) importScripts();

  // baidu tongji
  if (options.initBaiduTongji) initBaiduTonji();

  // remove loading placeholder
  document.querySelector('#loading-placeholder')?.remove();

  // app
  const app = createVueApp(App);
  if (options.loadStore) app.use(options.store || createStore());
  if (options.loadRouter) app.use(createRouter(options.routes));
  if (options.loadElementPlus) app.use(ElementPlus);
  if (options.loadI18n) app.use(i18n);
  if (options.loadFontAwesome) app.component('font-awesome-icon', FontAwesomeIcon);
  if (options.mount) app.mount(typeof options.mount === 'string' ? options.mount : '#app');

  return app;
};

export default createApp;
