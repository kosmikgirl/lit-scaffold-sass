import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import PageElement from './abstract/page-element';

@customElement('{{dashCase name}}')
export default class {{pascalCase name}} extends PageElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  constructor() {
    super({title: '{{sentenceCase name}}'});
  }

  render() {
    return html`
      <h1>{{pascalCase name}} page</h1>
    `;
  }
}
