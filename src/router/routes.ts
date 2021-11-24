import { literal } from 'lit/static-html.js';
import '../page/home-page';
import '../page/about-page';
import '../page/not-found-page';

export type Route = {
  path: string;
  tag: {
    _$litStatic$: unknown;
  };
}

export const routes: Array<Route> = [
  {
    path: '',
    tag: literal`home-page`,
  },
  {
    path: 'about/:name',
    tag: literal`about-page`,
  },
];

export const notFound: Route = {
  path: 'not-found',
  tag: literal`not-found-page`,
};