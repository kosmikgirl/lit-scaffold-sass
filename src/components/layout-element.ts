import {html, LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import SEO from '../util/seo';

export class LayoutElement extends LitElement {
  @property({type: String}) pageTitle = '';
  @property({type: String}) pageDescription = '';
  @property({type: String}) pageBanner = '';
  @property({type: String}) pageBannerAlt = '';

  render() {
    SEO.setSiteMetadata(
      this.pageTitle,
      this.pageDescription,
      this.pageBanner,
      this.pageBannerAlt
    );

    return html`
      <header>
        <slot name="headerContent"></slot>
      </header>
      <main>
        <slot name="mainContent"></slot>
      </main>
      <footer>
        <slot name="footerContent"></slot>
      </footer>
    `;
  }
}

window.customElements.define('layout-element', LayoutElement);
