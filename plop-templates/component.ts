import {customElement} from 'lit/decorators.js';
{{#if useSassStyles}}
import {html, LitElement, css} from 'lit';
import styles from './{{dashCase name}}.scss';
{{else}}
import {html, LitElement} from 'lit';
import {styles} from './styles';
{{/if}}

@customElement('{{dashCase name}}')
export class {{pascalCase name}} extends LitElement {
  {{#if useSassStyles}}
  static styles = css([styles] as unknown as TemplateStringsArray);
  {{else}}
  static styles = styles;
  {{/if}}

  {{#if isAddingLifeCycle}}

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  firstUpdated(): void {}
  {{/if}}

  render() {
    return html`<h2>{{sentenceCase name}} component</h2>`;
  }
}
