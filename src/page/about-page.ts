import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('about-page')
export default class AboutPage extends LitElement {

  @property({ type: Object })
  props = {
    name: 'WORLD',
  };

  render() {
    console.debug('[about-page] render', this.props);
    return html`<div>AboutPage ${this.props?.name || 'no name'}</div>`;
  }
}