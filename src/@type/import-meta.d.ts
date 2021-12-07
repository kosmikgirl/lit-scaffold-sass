import {Environment} from '../data/enum/environment';

interface ImportMeta {
  env: {
    MODE: Environment.DEVELOPMENT | Environment.PRODUCTION;
  };
}
