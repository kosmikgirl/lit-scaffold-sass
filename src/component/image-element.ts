import {css, html, LitElement} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';

@customElement('image-element')
export class ImageElement extends LitElement {
  @property() src: string = '';
  @property() alt: string = '';
  @property() type: 'jpg' | 'png' | 'webp' = 'webp';
  @property({type: Array})
  sizes: ReadonlyArray<number> = [300, 500, 700, 1000, 1200, 1400];

  @state() private imageArray: Array<string> = [];
  @state() private srcSet: string = '';

  @query('img') $img: HTMLImageElement;

  private lazyLoadObserver;

  constructor() {
    super();

    this.lazyLoadObserver = new IntersectionObserver(
      ([image]) => this.loadIntersectedImage(image)
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.lazyLoadObserver.disconnect();
  }

  protected firstUpdated(): void {
    this.lazyLoadObserver.observe(this.$img);
  }

  static get styles() {
    return css`
      picture {
        display: block;
        margin-top: 200vh;
      }

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
  }

  async loadIntersectedImage(image: IntersectionObserverEntry) {
    if (!image.isIntersecting) return;

    const $img = image.target as HTMLImageElement;

    if (!$img) return;

    $img.sizes = this.$img.dataset.sizes as string;
    $img.srcset = this.$img.dataset.srcset as string;
    $img.src = this.$img.dataset.src as string;

    this.lazyLoadObserver.unobserve(this.$img);
  }

  async importImage() {
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

    await this.importImage();
  }

  render() {
    return html`
      <picture>
        <img
          data-sizes="(max-width: 1400px) 100vw, 1400px"
          data-srcset=${this.srcSet}
          data-src=${this.imageArray[this.imageArray.length - 1]}
          alt=${this.alt}
        />
      </picture>
    `;
  }
}
