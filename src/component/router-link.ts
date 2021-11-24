import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import router from '../router/router';

@customElement('router-link')
export default class RouterLink extends LitElement {

  @property({ type: String })
  to = '/';

  navigate(event: MouseEvent) {
    event.preventDefault();

    router.navigate(this.to);
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