import {css, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('image-element')
export class ImageElement extends LitElement {
  @property() src: string = '';
  @property() alt: string = '';
  @property() type: 'jpg' | 'png' | 'webp' = 'webp';
  @property({type: Array})
  sizes: ReadonlyArray<number> = [300, 500, 700, 1000, 1200, 1400];

  @state() private imageArray: Array<string> = [];
  @state() private srcSet: string = '';

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

  async loadImage() {
    const image = await import(
      /* @vite-ignore */
      `../asset/${this.src}?w=${this.sizes.join(';')}&${this.type}`
    );

    if (!image.default) return;

    this.imageArray = image.default;
    this.srcSet = this.imageArray.reduce(
      (result, image, index) => `${result}${image} ${this.sizes[index]}w, `,
      ''
    );
  }

  async willUpdate(changedProperties: Map<string, boolean>) {
    if (
      !changedProperties.has('src') &&
      !changedProperties.has('sizes') &&
      !changedProperties.has('type')
    )
      return;

    await this.loadImage();
  }

  render() {
    return html`
      <picture>
        <img
          sizes="(max-width: 1400px) 100vw, 1400px"
          srcset=${this.srcSet}
          src=${this.imageArray[this.imageArray.length - 1]}
          alt=${this.alt}
        />
      </picture>
    `;
  }
}
