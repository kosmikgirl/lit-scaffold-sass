import {literal} from 'lit/static-html.js';
import '../page/home-page';
import '../page/about-page';
import '../page/not-found-page';

export enum RouteParamKey {
  id = 'id',
  slug = 'slug',
}

export type RouteParamType = {[key in RouteParamKey]?: string};

export type Route = {
  name: string;
  path: string;
  tag: {
    _$litStatic$: unknown;
  };
};

export const RouteNames = {
  HOME: 'home',
  ABOUT: 'about',
  NOT_FOUND: 'not-found',
};

export const routes: Array<Route> = [
  {
    name: RouteNames.HOME,
    path: '/',
    tag: literal`home-page`,
  },
  {
    name: RouteNames.ABOUT,
    path: `/about/:${RouteParamKey.id}`,
    tag: literal`about-page`,
  },
];

export const notFoundRoute: Route = {
  name: RouteNames.NOT_FOUND,
  path: 'not-found',
  tag: literal`not-found-page`,
};
