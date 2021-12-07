import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('image-element')
export class ImageElement extends LitElement {
  @property() src: string = '';
  @property() title: string = '';

  render() {
    return html`<img src=${this.src} alt=${this.title} />`;
  }
}
