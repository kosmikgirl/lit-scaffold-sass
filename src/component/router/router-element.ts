import {LitElement} from 'lit';
import {html} from 'lit/static-html.js';
import {customElement, state} from 'lit/decorators.js';
import {Match} from 'navigo';
import router, {pageNotFound} from '../../router/router';
import {routes} from '../../router/routes';
import {isLocalizationEnabled} from '../../config/locale-config';
import {RouteType} from '../../data/type/route-types';

@customElement('router-element')
export default class RouterElement extends LitElement {
  @state()
  private activeRoute = {
    tag: routes[0].tag,
    routeData: {},
  };

  connectedCallback(): void {
    super.connectedCallback();

    const processedRoutes = isLocalizationEnabled
      ? routes.map(
          (route: RouteType): RouteType => ({
            ...route,
            path: `/:lang${route.path}`,
          })
        )
      : routes;

    processedRoutes.forEach(route => {
      router.on({
        [route.path]: {
          as: route.name,
          uses: (match: Match) => this.changeRoute(match),
        },
      });
    });

    router.resolve();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    routes.forEach(route => {
      router.off(route.path);
    });
  }

  changeRoute(matchedRoute: Match): void {
    const foundRoute = routes.find(
      route => route.name === matchedRoute.route.name
    );

    this.activeRoute = {
      tag: foundRoute.tag,
      routeData: matchedRoute.data || {},
    };
  }

  render() {
    const {tag, routeData} = this.activeRoute;
    return html`<${tag} .routeData=${routeData}></${tag}>`;
  }
}
