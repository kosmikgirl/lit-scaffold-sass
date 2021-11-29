import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {RouteData} from '../data/type/route-types';

export default class PageElement extends LitElement {
  @property({type: Object})
  routeData: RouteData = {};

  render() {
    return html`<div>LitPageElement</div>`;
  }
}