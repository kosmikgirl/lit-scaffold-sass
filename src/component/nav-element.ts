import {html, LitElement} from 'lit';
import {RouteDataParam, RouteNames} from '../data/enum/index';
import {customElement} from 'lit/decorators.js';

@customElement('nav-element')
export class NavElement extends LitElement {
  render() {
    return html`<nav>
      <router-link to="/" title="HomePage">Home</router-link>
      <router-link
        .to=${{
          name: RouteNames.ABOUT,
          routeData: {
            [RouteDataParam.id]: 'demo',
          },
        }}
        title="AboutPage"
      >
        About
      </router-link>
      <router-link to="xyz">Not found</router-link>
    </nav>`;
  }
}
