import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {msg as localize, localized} from '@lit/localize/lit-localize';
import PageElement from '../abstract/page-element';
import {styles} from './styles';

@localized()
@customElement('home-page')
export default class HomePage extends PageElement {
  static styles = styles;

  constructor() {
    super({title: 'Home'});
  }

  render() {
    return html`<h2>${localize('HomePage')}</h2>`;
  }
}
