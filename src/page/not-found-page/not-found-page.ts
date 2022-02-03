import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import PageElement from '../abstract/page-element';
import {styles} from './styles';

@customElement('not-found-page')
export default class NotFoundPage extends PageElement {
  static styles = styles;

  constructor() {
    super({title: 'Not found'});
  }

  render() {
    return html`<h2>Not Found</h2>`;
  }
}
