import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import PageElement from '../component/page-element';

@customElement('not-found-page')
export default class NotFoundPage extends PageElement {
  render() {
    return html`<div>Not Found</div>`;
  }
}
