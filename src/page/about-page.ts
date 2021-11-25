import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('about-page')
export default class AboutPage extends LitElement {

  @property({ type: Object })
  routeProps = {
    name: 'WORLD',
  };

  render() {
    return html`<div>AboutPage ${this.routeProps?.name || 'no name'}</div>`;
  }
}