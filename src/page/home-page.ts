import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {msg, localized} from '@lit/localize/lit-localize';
import PageElement from './abstract/page-element';

@localized()
@customElement('home-page')
export default class HomePage extends PageElement {
  render() {
    return html`<div>${msg('HomePage')}</div>`;
  }
}
