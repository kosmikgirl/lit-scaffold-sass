import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('lit-scaffold')
export class LitScaffold extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 20px;
        max-width: 60%;
        margin: 0 auto;
      }
    `;
  }

  protected render() {
    return html`<h1>Lit Scaffold</h1>`;
  }
}
