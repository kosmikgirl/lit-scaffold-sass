import {html, css, LitElement} from 'lit';

export class {{pascalCase name}} extends LitElement {
  render() {
    return html`
      <div>
        <h2>{{sentenceCase name}} component</h2>
      </div>`
    ;
  }
}

window.customElements.define('{{kebabCase name}}', {{pascalCase name}});
