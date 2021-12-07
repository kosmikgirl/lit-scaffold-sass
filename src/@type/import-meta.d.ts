import {Environment} from '../data/enum/environment';

declare global {
  interface ImportMeta {
    env: {
      MODE: Environment.DEVELOPMENT | Environment.PRODUCTION;
      VITE_IS_LOCALE_ENABLED: boolean;
      VITE_STATIC_ROOT: string;
    };
  }
}