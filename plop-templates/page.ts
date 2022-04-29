import {customElement} from 'lit/decorators.js';
import PageElement from '../abstract/page-element';
{{#if useSassStyles}}
import {html, css} from 'lit';
import styles from './{{dashCase name}}.scss';
{{else}}
import {html} from 'lit';
import {styles} from './styles';
{{/if}}

@customElement('{{dashCase name}}')
export default class {{pascalCase name}} extends PageElement {
  {{#if useSassStyles}}
  static styles = css([styles] as unknown as TemplateStringsArray);
  {{else}}
  static styles = styles;
  {{/if}}

  constructor() {
    super({title: '{{sentenceCase name}}'});
  }
  {{#if isAddingLifeCycle}}

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  firstUpdated(): void {}
  {{/if}}

  render() {
    return html`<h1>{{pascalCase name}} page</h1>`;
  }
}
