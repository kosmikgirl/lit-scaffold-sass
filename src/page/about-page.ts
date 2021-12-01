import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {RouteDataParam} from '../data/enum/route-enums';
import PageElement from './abstract/page-element';

@customElement('about-page')
export default class AboutPage extends PageElement {
  constructor() {
    super({title: 'About'});
  }

  render() {
    return html`<div>
      AboutPage ${this.routeData?.[RouteDataParam.id] || 'no id'}
    </div>`;
  }
}
