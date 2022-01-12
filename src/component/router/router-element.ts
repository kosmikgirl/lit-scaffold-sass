import {LitElement} from 'lit';
import {html} from 'lit/static-html.js';
import {customElement, state} from 'lit/decorators.js';
import {Match} from 'navigo';
import router from '../../router/router';
import {routes} from '../../router/routes';
import {RouteType} from '../../data/type';

@customElement('router-element')
export default class RouterElement extends LitElement {
  @state()
  private activeRoute = {
    tag: routes[0].tag,
    routeData: {},
  };

  connectedCallback(): void {
    super.connectedCallback();

    const processedRoutes = import.meta.env.VAR_IS_LOCALE_ENABLED === 'false'
      ? routes
      : routes.map(
        (route: RouteType): RouteType => ({
          ...route,
          path: `/:lang${route.path}`,
        }),
      );

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
      route => route.name === matchedRoute.route.name,
    );

    if (!foundRoute) return;

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
