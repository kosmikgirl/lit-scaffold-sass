import {LitElement} from 'lit';
import {html} from 'lit/static-html.js';
import {customElement, state} from 'lit/decorators.js';
import {Match} from 'navigo';
import router from '../../router/router';
import {notFoundRoute, routes} from '../../router/routes';
import {getLocale, isLocalizationEnabled, setLocale} from '../../config/locale-config';
import {RouteType} from '../../data/type/route-types';
import {allLocales, sourceLocale} from '../../data/locale-codes';
import {RouteNames} from '../../data/enum/route-enums';

@customElement('router-element')
export default class RouterElement extends LitElement {
  @state()
  private activeRoute = {
    tag: routes[0].tag,
    routeData: {},
  };

  connectedCallback(): void {
    super.connectedCallback();

    router.hooks({
      before: (done, match) => this.beforeChangeRoute(done, match),
    });

    const processedRoutes = isLocalizationEnabled
      ? routes.map((route: RouteType): RouteType => ({
        ...route,
        path: `/:lang${route.path}`,
      }))
      : routes;

    processedRoutes.forEach(route => {
      router.on({
        [route.path]: {
          as: route.name,
          uses: (match: Match) => this.changeRoute(match),
        },
      });
    });

    router.notFound(() => this.notFound());
    router.resolve();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    routes.forEach(route => {
      router.off(route.path);
    });
  }

  localizePath(path: string, locale: string) {
    let newPath = path;
    if (!newPath.startsWith('/')) newPath = `/${newPath}`;

    if (newPath.includes(':lang')) {
      console.debug('[router-element] localizePath', newPath.replace(':lang', locale));
      return newPath.replace(':lang', locale);
    }

    return `/${locale}${newPath}`;
  }

  beforeChangeRoute(done: Function, matchedRoute: Match): void {
    if (!isLocalizationEnabled) return done();

    const lang = matchedRoute.data?.lang;
    const locale = allLocales.find(locale => locale === lang);

    if (!locale) {
      const path = this.localizePath(matchedRoute.url, getLocale());

      if (!router.match(path)) {
        this.notFound();
        return done();
      }

      router.navigate(path);

      return done(false);
    }

    setLocale(locale);

    done();
  }

  changeRoute(matchedRoute: Match): void {
    const newRoute = routes.find(
      route => route.name === matchedRoute.route.name,
    );

    if (!newRoute) return this.notFound();

    this.activeRoute = {
      tag: newRoute.tag,
      routeData: matchedRoute.data || {},
    };
  }

  notFound(): void {
    const routeData = isLocalizationEnabled ? {lang: getLocale()} : {};

    router.navigateByName(RouteNames.NOT_FOUND, routeData);
  }

  render() {
    const {tag, routeData} = this.activeRoute;

    return html`<${tag} .routeData=${routeData}></${tag}>`;
  }
}
