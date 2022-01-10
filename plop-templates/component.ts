import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('{{kebabCase name}}')
export class {{pascalCase name}} extends LitElement {
  render() {
    return html`
      <div>
        <h2>{{sentenceCase name}} component</h2>
      </div>`
    ;
  }
}
