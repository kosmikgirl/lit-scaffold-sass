import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {styles} from './styles';

@customElement('{{kebabCase name}}')
export class {{pascalCase name}} extends LitElement {
  static styles = styles;

  render() {
    return html`
      <h2>{{sentenceCase name}} component</h2>
    `;
  }
}
