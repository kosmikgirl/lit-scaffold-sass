import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {RouteDataParam} from '../../data/enum';
import PageElement from '../abstract/page-element';
import {styles} from './styles';

@customElement('about-page')
export default class AboutPage extends PageElement {
  static styles = styles;

  constructor() {
    super({title: 'About'});
  }

  render() {
    return html`<h2>
      AboutPage ${this.routeData?.[RouteDataParam.ID] || 'no id'}
    </h2>`;
  }
}
