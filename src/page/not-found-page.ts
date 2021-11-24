import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('not-found-page')
export default class NotFoundPage extends LitElement {
  render() {
    return html`
      <div>
        Not Found
      </div>
    `;
  }
}