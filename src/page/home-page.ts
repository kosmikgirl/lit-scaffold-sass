import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import PageElement from '../component/page-element';

@customElement('home-page')
export default class HomePage extends PageElement {
  render() {
    return html`<div>HomePage</div>`;
  }
}
