import {RouteDataParam} from '../enum/route-enums';

export type RouteData = {[key in RouteDataParam]?: string};

export type RouteTypes = {
  name: string;
  path: string;
  tag: {
    _$litStatic$: unknown;
  };
}
