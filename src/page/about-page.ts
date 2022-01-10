import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {RouteDataParam} from '../data/enum/';
import PageElement from './abstract/page-element';

@customElement('about-page')
export default class AboutPage extends PageElement {
  constructor() {
    super({title: 'About'});
  }

  render() {
    return html`<div>
      AboutPage ${this.routeData?.[RouteDataParam.ID] || 'no id'}
    </div>`;
  }
}
