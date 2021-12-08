import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('image-element')
export class ImageElement extends LitElement {
  @property() src: string = '';
  @property() alt: string = '';

  static get styles() {
    return css`
      picture {
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
  }

  render() {
    const imageSizes = ['300', '500', '700', '1000', '1200', '1400'];
    const imageArray: string[] = this.src.split(',');
    let scrsetString = '';

    imageArray.forEach((image, index): void => {
      scrsetString = `${scrsetString}${image} ${imageSizes[index]}w, `;
    });

    return html`
      <picture>
        <img
          sizes="(max-width: 1400px) 100vw, 1400px"
          srcset=${scrsetString}
          src=${imageArray[imageArray.length - 1]}
          alt=${this.alt}
        />
      </picture>
    `;
  }
}
