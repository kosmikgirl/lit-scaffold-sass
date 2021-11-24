import { LitElement } from 'lit';
import { html, literal } from 'lit/static-html.js';
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

  constructor() {
    super();

    this.changeRoute = this.changeRoute.bind(this);
    this.notFound = this.notFound.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    routes.forEach(route => {
      console.debug('[router-element]', route.path);
      router.on(route.path, this.changeRoute);
    });
    router.notFound(this.notFound);
    router.resolve();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    routes.forEach(route => {
      router.off(route.path);
    });
  }

  changeRoute(matchedRoute: Match | undefined): void {
    console.debug('[router-element] changeRoute', matchedRoute);
    const newRoute = routes.find(route => route.path === matchedRoute?.route?.path);

    if (!newRoute) return this.notFound();

    this.activeRoute = {
      tag: newRoute.tag,
      props: matchedRoute?.data|| {},
    };
  }

  notFound(): void {
    this.activeRoute = { tag: notFound.tag };
  }

  render() {
    const { tag, props } = this.activeRoute;

    console.debug('[router-element] render', this.activeRoute.props);
    return html`
    <${tag} props=${props}></${tag}>
`;
  }
}