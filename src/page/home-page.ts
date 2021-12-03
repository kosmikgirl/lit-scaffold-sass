import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {msg as localize, localized} from '@lit/localize/lit-localize';
import PageElement from './abstract/page-element';

@localized()
@customElement('home-page')
export default class HomePage extends PageElement {
  render() {
    return html`<div>${localize('HomePage')}</div>`;
  }
}
