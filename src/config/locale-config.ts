import {configureLocalization} from '@lit/localize';
import {Environment} from '../data/enum/environment';
import {sourceLocale, targetLocales} from '../data/i18n/locale-codes';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale: string) => {
    console.log(process.env.NODE_ENV);
    return import(
      /* @vite-ignore */ `../data/i18n/locale/generated/${locale}.js`
    );
  },
});
