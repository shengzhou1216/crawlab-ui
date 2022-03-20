import {getI18n} from '@/i18n';
import {updateTitle} from '@/utils/dom';
import {LOCAL_STORAGE_KEY_LANG} from '@/constants/localStorage';

export const translate = (path: string, args?: any): string => {
  const {t} = getI18n().global;
  const res = t(path, args);
  if (typeof res === 'string') return res;
  return path;
};
window._t = translate;

export const translateC = (c: number, path: string): string => {
  const {n} = getI18n().global;
  const res = n(c, path);
  console.debug(res, c, path);
  if (typeof res === 'string') return res;
  return path;
};
window._tc = translateC;

export const translatePlugin = (pluginName: string, path: string): string => {
  return translate(`plugins.${pluginName}.${path}`);
};
window._tp = translatePlugin;

export const setGlobalLang = (lang: Lang) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_LANG, lang);
  getI18n().global.locale.value = lang;
  updateTitle(translate('global.title'));
};

export const getLanguage = (): string => {
  return getI18n().global.locale.value === 'zh' ? 'zh_CN' : 'en';
};
