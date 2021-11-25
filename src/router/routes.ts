import {literal} from 'lit/static-html.js';
import '../page/home-page';
import '../page/about-page';
import '../page/not-found-page';

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
    path: '/about/:name',
    tag: literal`about-page`,
  },
];

export const notFound: Route = {
  name: RouteNames.NOT_FOUND,
  path: 'not-found',
  tag: literal`not-found-page`,
};
