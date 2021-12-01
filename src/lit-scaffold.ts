import {html, css, LitElement} from 'lit';
import {state} from 'lit/decorators.js';
import {connect} from 'pwa-helpers';
import store from './store/store';
import {AppState, setIsInitialized} from './store/module/app';
import {RouteNames, RouteDataParam} from './data/enum/route-enums';
import './component/router/router-link';
import './component/router/router-element';

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

  stateChanged(state: {app: AppState}) {
    this.isInitialized = state.app.isInitialized;

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

  render() {
    if (!this.isInitialized) return html`<h1>Loading...</h1>`;

    return html`
      <nav>
        <router-link to="/" title="HomePage">Home</router-link>
        <router-link
          .to=${{
            name: RouteNames.ABOUT,
            routeData: {
              [RouteDataParam.id]: 'demo',
            },
          }}
          title="AboutPage"
        >
          About
        </router-link>
        <router-link to="xyz">Not found</router-link>
      </nav>
      <h1>Lit Scaffold</h1>
      <router-element></router-element>
    `;
  }
}

window.customElements.define('lit-scaffold', LitScaffold);
