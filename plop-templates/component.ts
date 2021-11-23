import {html, css, LitElement} from 'lit';

export class {{pascalCase name}} extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<h2>{{sentenceCase name}} component</h2>`;
  }
}

window.customElements.define('{{kebabCase name}}', {{pascalCase name}});
