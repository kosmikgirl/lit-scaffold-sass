import {literal} from 'lit/static-html.js';
import {RouteTypes} from '../data/type/';
import {RouteNames, RouteDataParam} from '../data/enum/';
import '../page/home-page';
import '../page/about-page';
import '../page/not-found-page';

export const routes: ReadonlyArray<RouteTypes> = [
  {
    name: RouteNames.HOME,
    path: '/',
    tag: literal`home-page`,
  },
  {
    name: RouteNames.ABOUT,
    path: `/about/:${RouteDataParam.id}`,
    tag: literal`about-page`,
  },
];

export const notFoundRoute: RouteTypes = {
  name: RouteNames.NOT_FOUND,
  path: 'not-found',
  tag: literal`not-found-page`,
};
