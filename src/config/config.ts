import {EnvironmentNames, VariableNames, URLNames} from '../data/enum';

export const config = {
  environments: {
    [EnvironmentNames.PRODUCTION]: {
      variables: {},
      urls: {},
    },
    [EnvironmentNames.STAGING]: {
      extends: EnvironmentNames.PRODUCTION,
      variables: {},
      urls: {},
    },
    [EnvironmentNames.DEVELOPMENT]: {
      extends: EnvironmentNames.STAGING,
      variables: {},
      urls: {},
    },
    [EnvironmentNames.LOCAL]: {
      extends: EnvironmentNames.DEVELOPMENT,
      variables: {},
      urls: {},
    },
  },
  variables: {
    [VariableNames.STATIC_ROOT]: '/static/',
    [VariableNames.IS_LOCALE_ENABLED]: true,
  },
  urls: {
    [URLNames.API]: {
      url: '/api',
      target: '',
      features: '',
    },
  },
};

let environment = EnvironmentNames.PRODUCTION;
const {host} = document.location;

switch (host.split(':').shift()) {
  case 'localhost': {
    environment = EnvironmentNames.LOCAL;
    break;
  }
  default: {
    environment = EnvironmentNames.PRODUCTION;
    break;
  }
}

export {environment};
