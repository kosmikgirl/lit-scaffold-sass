import {html, css, LitElement} from 'lit';
import {state} from 'lit/decorators.js';
import {connect} from 'pwa-helpers';
import store from './store/store';
import {AppState, setIsInitialized} from './store/module/app';
import './component/router/router-link';
import './component/router/router-element';
import './component/nav-element';
import SEO from './util/seo';

export class LitScaffold extends connect(store)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 20px;
        max-width: 60%;
        margin: 0 auto;
      }
    `;
  }

  @state()
  private isInitialized = false;

  stateChanged({app: {isInitialized, pageMetadata}}: {app: AppState}) {
    this.isInitialized = isInitialized;
    SEO.setSiteMetadata(pageMetadata);

    /**
     *  Uncomment the next condition and run `pwa:build` to get the PWA web worker up and running.
     *  It will only be available in your build.
     *
     *  If you need to customize the configuration, please visit:
     *  https://developers.google.com/web/tools/workbox/guides/generate-service-worker/cli.
     */
    // if (
    //   state.app.isInitialized &&
    //   'serviceWorker' in navigator &&
    //   import.meta.env?.MODE !== 'development'
    // ) {
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('./service-worker.js').then(
    //       registration => {
    //         console.log(
    //           'ServiceWorker registration successful with scope: ',
    //           registration.scope
    //         );
    //       },
    //       err => {
    //         console.log('ServiceWorker registration failed: ', err);
    //       }
    //     );
    //   });
    // }
  }

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(setIsInitialized(true));
  }

  headerTemplate() {
    return html``;
  }

  render() {
    return html`
      <header>
        <h1>${!this.isInitialized ? 'Loading...' : 'Lit Scaffold'}</h1>
        <nav-element></nav-element>
      </header>

      <main>
        <router-element slot="mainContent"></router-element>
      </main>

      <footer>Footer.</footer>
    `;
  }
}

window.customElements.define('lit-scaffold', LitScaffold);
