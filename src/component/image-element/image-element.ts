import {html, LitElement} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';
import imageSizeDirective from '../../data/constant/image-size-directive';
import {styles} from './styles';

@customElement('image-element')
export class ImageElement extends LitElement {
  static styles = styles;

  @property({type: Array}) imageSet: Array<string> = [];
  @property() alt: string = '';

  @state() private srcSet: string = '';

  @query('img') $img: HTMLImageElement;

  private lazyLoadObserver: IntersectionObserver;

  constructor() {
    super();

    this.lazyLoadObserver = new IntersectionObserver(([intersectedImage]) =>
      this.loadIntersectedImage(intersectedImage)
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.lazyLoadObserver.disconnect();
  }

  protected firstUpdated(): void {
    this.lazyLoadObserver.observe(this.$img);
  }

  async loadIntersectedImage(image: IntersectionObserverEntry) {
    if (!image.isIntersecting) return;

    const $img = image.target as HTMLImageElement;

    if (!$img) return;

    if (this.lazyLoadObserver) this.lazyLoadObserver.unobserve(this.$img);

    $img.sizes = this.$img.dataset.sizes as string;
    $img.srcset = this.$img.dataset.srcset as string;
    $img.src = this.$img.dataset.src as string;
  }

  willUpdate(changedProps: Map<string, boolean>) {
    if (!changedProps.has('src') && !changedProps.has('sizes')) return;

    this.srcSet = this.imageSet.reduce(
      (result, image, index) =>
        `${result}${image} ${imageSizeDirective[index]}w, `,
      ''
    );
  }

  render() {
    return html`
      <picture>
        <img
          data-sizes="(max-width: 1400px) 100vw, 1400px"
          data-srcset=${this.srcSet}
          data-src=${this.imageSet[this.imageSet.length - 1]}
          alt=${this.alt}
        />
      </picture>
    `;
  }
}
