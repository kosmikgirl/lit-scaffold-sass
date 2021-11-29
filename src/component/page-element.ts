import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {RouteParamType} from '../router/routes';

export default class PageElement extends LitElement {
  @property({type: Object})
  routeParams: RouteParamType = {};

  render() {
    return html`<div>LitPageElement</div>`;
  }
}