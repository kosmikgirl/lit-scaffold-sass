import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import PageElement from './abstract/page-element';

@customElement('home-page')
export default class HomePage extends PageElement {
  constructor() {
    super({title: 'Home'});
  }

  render() {
    return html`<div>HomePage</div>`;
  }
}
