import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import PageElement from './abstract/page-element';
import {styles} from './page/styles';

@customElement('{{dashCase name}}')
export default class {{pascalCase name}} extends PageElement {
  static styles = styles;

  constructor() {
    super({title: '{{sentenceCase name}}'});
  }

  render() {
    return html`
      <h1>{{pascalCase name}} page</h1>
    `;
  }
}
