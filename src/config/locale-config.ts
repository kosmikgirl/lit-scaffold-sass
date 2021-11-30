import {configureLocalization} from '@lit/localize';
import {sourceLocale, targetLocales} from '../data/locale-codes';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`../data/locale/${locale}`),
});