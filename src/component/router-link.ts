import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import router from '../router/router';

type Link = {
  name: string;
  params: object;
}

@customElement('router-link')
export default class RouterLink extends LitElement {

  @property()
  to: string | Link = '/';

  navigate(event: MouseEvent) {
    event.preventDefault();

    if (typeof this.to === 'string') return router.navigate(this.to);

    router.navigate(router.generate(this.to.name, this.to.params));
  }

  render() {
    return html`
      <a 
        href=${this.to} 
        @click=${this.navigate}
      >
        <slot></slot>
      </a>
    `;
  }
}