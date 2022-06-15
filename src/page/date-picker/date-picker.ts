import {customElement, property} from 'lit/decorators.js';
import PageElement from '../abstract/page-element';
import {html, css} from 'lit';
import styles from './date-picker.scss';

@customElement('date-picker')
export default class DatePicker extends PageElement {
  static styles = [ css([styles] as unknown as TemplateStringsArray) ];

  constructor() {
    super({title: 'Date Picker'});
  }

  render() {
    return html`<div>
    
      <h1 class="title">Date Picker page</h1>

      <div class="test-container"></div>
    
    </div>`;
  }
}
