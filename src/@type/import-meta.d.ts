import {Environment} from '../data/enum';

declare global {
  interface ImportMeta {
    env: {
      MODE: Environment.DEVELOPMENT | Environment.PRODUCTION;
      VAR_IS_LOCALE_ENABLED: boolean;
      VAR_STATIC_ROOT: string;
    };
  }
}