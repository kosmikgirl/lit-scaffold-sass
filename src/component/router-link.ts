import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import router from '../router/router';

type Link = {
  name: string;
  routeProps: Record<string, string>;
};

@customElement('router-link')
export default class RouterLink extends LitElement {
  @property()
  to: string | Link = '/';

  navigate(event: MouseEvent) {
    event.preventDefault();

    if (typeof this.to === 'string') return router.navigate(this.to);

    router.navigateByName(this.to.name, this.to.routeProps);
  }

  render() {
    return html`
      <a href=${this.to} @click=${this.navigate}>
        <slot></slot>
      </a>
    `;
  }
}
