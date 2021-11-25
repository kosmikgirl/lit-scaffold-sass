import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import { customElement, state } from 'lit/decorators.js';
import { Match } from 'navigo';
import router from '../router/router';
import {notFound, routes} from '../router/routes';

@customElement('router-element')
export default class RouterElement extends LitElement {

  @state()
  private activeRoute = {
    tag: routes[0].tag,
    props: {},
  };

  connectedCallback(): void {
    super.connectedCallback();

    routes.forEach(route => {
      router.on({ [route.path]: {
        as: route.name,
        uses: (match: Match) => this.changeRoute(match),
      }});
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
    const newRoute = routes.find(route => route.name === matchedRoute.route.name);

    if (!newRoute) return this.notFound();

    this.activeRoute = {
      tag: newRoute.tag,
      props: matchedRoute.data || {},
    };
  }

  notFound(): void {
    this.activeRoute = { tag: notFound.tag, props: {} };
  }

  render() {
    const { tag, props } = this.activeRoute;

    return html`<${tag} .routeProps=${props}></${tag}>`;
  }
}