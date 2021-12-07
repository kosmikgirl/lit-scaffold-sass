import {configureLocalization} from '@lit/localize';
import {Environment} from '../data/enum/environment';
import {sourceLocale, targetLocales} from '../data/i18n/locale-codes';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale: string) =>
    import(
      /* @vite-ignore */ process.env.NODE_ENV !== Environment.PRODUCTION
        ? `../data/i18n/locale/generated/${locale}`
        : `./generated/${locale}.js`
    ),
});
