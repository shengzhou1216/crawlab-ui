import i18n from '@/i18n';

export const setGlobalLang = (lang: Lang) => {
  localStorage.setItem('lang', lang);
  i18n.global.locale.value = lang;
};

export const translate = (path: string): string => {
  const {tm} = i18n.global;
  return tm(path) as string;
};
