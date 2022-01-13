import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('{{kebabCase name}}')
export class {{pascalCase name}} extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <h2>{{sentenceCase name}} component</h2>
    `;
  }
}
