import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {RouteParamKey} from '../router/routes';
import PageElement from '../component/page-element';

@customElement('about-page')
export default class AboutPage extends PageElement {
  render() {
    return html`<div>
      AboutPage ${this.routeParams?.[RouteParamKey.id] || 'no id'}
    </div>`;
  }
}
