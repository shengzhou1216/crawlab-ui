import {createApp as createVueApp} from 'vue';
import ElementPlus from 'element-plus';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import i18n from '@/i18n';
import {initBaiduTonji} from '@/admin/baidu';
import {importScripts, importStylesheets} from '@/package/utils';

const createApp = () => {
  // import stylesheets
  importStylesheets();

  // import scripts
  importScripts();

  // baidu tongji
  initBaiduTonji();

  // remove loading placeholder
  document.querySelector('#loading-placeholder')?.remove();

  // app
  const app = createVueApp(App);
  app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
};

export default createApp;
