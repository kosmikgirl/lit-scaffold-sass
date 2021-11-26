import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('about-page')
export default class AboutPage extends LitElement {
  @property()
  routeParams: RouteParamType = {id: 'ID'};

  render() {
    return html`<div>AboutPage ${this.routeParams?.id || 'no id'}</div>`;
  }
}
