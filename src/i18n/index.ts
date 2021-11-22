import {createI18n} from 'vue-i18n';
import en from './lang/en';
import zh from './lang/zh';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  messages: {
    en,
    zh
  },
  fallbackLocale: 'en',
});

export default i18n;
