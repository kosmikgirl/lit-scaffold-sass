import {RouteDataParam} from '../enum/index';

export type RouteData = {[key in RouteDataParam]?: string};

export type RouteTypes = {
  name: string;
  path: string;
  tag: {
    _$litStatic$: unknown;
  };
};
