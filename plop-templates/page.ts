import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import PageElement from './abstract/page-element';

@customElement('{{dashCase name}}')
export default class {{pascalCase name}} extends PageElement {
  constructor() {
    super({title: '{{sentenceCase name}}'});
  }

  render() {
    return html`<div>
      {{pascalCase name}}
    </div>`;
  }
}
