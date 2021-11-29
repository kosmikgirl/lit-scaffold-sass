import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {RouteParamEnum, RouteParamType} from '../router/routes';

@customElement('about-page')
export default class AboutPage extends LitElement {
  @property({type: Object})
  routeParams: RouteParamType = {[RouteParamEnum.id]: 'ID'};

  render() {
    return html`<div>
      AboutPage ${this.routeParams?.[RouteParamEnum.id] || 'no id'}
    </div>`;
  }
}
