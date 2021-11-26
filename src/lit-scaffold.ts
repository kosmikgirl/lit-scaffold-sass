import {html, css, LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {connect} from 'pwa-helpers';
import store from './store/store';
import {AppState, setIsInitialized} from './store/module/app';

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

  @property({type: Boolean})
  isInitialized = false;

  stateChanged(state: {app: AppState}) {
    this.isInitialized = state.app.isInitialized;

    /**
     *  Uncomment the next condition and run `build:sw`
     *  to get the PWA web worker up and running.
     */
    if (state.app.isInitialized && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
      });
    }
  }

  firstUpdated() {
    store.dispatch(setIsInitialized(true));
  }

  render() {
    if (!this.isInitialized) return html`<h1>Loading...</h1>`;

    return html`<h1>Lit Scaffold</h1>`;
  }
}

window.customElements.define('lit-scaffold', LitScaffold);
