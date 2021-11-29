import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {RouteParamKey, RouteParamType} from '../router/routes';

@customElement('about-page')
export default class AboutPage extends LitElement {
  @property({type: Object})
  routeParams: RouteParamType = {[RouteParamKey.id]: 'ID'};

  render() {
    return html`<div>
      AboutPage ${this.routeParams?.[RouteParamKey.id] || 'no id'}
    </div>`;
  }
}
