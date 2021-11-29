import i18n from '@/i18n';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import zh from 'javascript-time-ago/locale/zh';

export const setGlobalLang = (lang: Lang) => {
  localStorage.setItem('lang', lang);
  i18n.global.locale.value = lang;
  TimeAgo.locale(lang === 'zh' ? zh : en);
};

export const translate = (path: string): string => {
  const {tm} = i18n.global;
  const res = tm(path);
  if (typeof res === 'string') return res;
  return path;
};

export const getLanguage = (): string => {
  return i18n.global.locale.value === 'zh' ? 'zh_CN' : 'en';
};
