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
  return tm(path) as string;
};
