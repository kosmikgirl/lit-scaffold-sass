import {literal} from 'lit/static-html.js';
import {RouteType} from '../data/type/route-types';
import {RouteNames, RouteDataParam} from '../data/enum/route-enums';
import '../page/home-page';
import '../page/about-page';
import '../page/not-found-page';

export const routes: ReadonlyArray<RouteType> = [
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
  {
    name: RouteNames.NOT_FOUND,
    path: '/404',
    tag: literal`not-found-page`,
  }
];
