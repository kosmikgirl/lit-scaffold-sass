import {html, css, LitElement} from 'lit';

export class LitScaffold extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  protected render() {
    return html`<h2>{{sentenceCase name}} component</h2>`;
  }
}

window.customElements.define('{{dashCase name}}', LitScaffold);
