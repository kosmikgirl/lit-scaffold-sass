import {LitElement} from 'lit';
import {html} from 'lit/static-html.js';
import {customElement, state} from 'lit/decorators.js';
import {Match} from 'navigo';
import router from '../router/router';
import {notFoundRoute, routes} from '../router/routes';

@customElement('router-element')
export default class RouterElement extends LitElement {
  @state()
  private activeRoute = {
    tag: routes[0].tag,
    routeData: {},
  };

  connectedCallback(): void {
    super.connectedCallback();

    routes.forEach(route => {
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

  changeRoute(matchedRoute: Match): void {
    const newRoute = routes.find(
      route => route.name === matchedRoute.route.name
    );

    if (!newRoute) return this.notFound();

    this.activeRoute = {
      tag: newRoute.tag,
      routeData: matchedRoute.data || {},
    };
  }

  notFound(): void {
    this.activeRoute = {tag: notFoundRoute.tag, routeData: {}};

    router.navigate('404');
  }

  render() {
    const {tag, routeData} = this.activeRoute;

    return html`<${tag} .routeData=${routeData}></${tag}>`;
  }
}
