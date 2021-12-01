import {html, css, LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {connect} from 'pwa-helpers';
import store from './store/store';
import {AppState, setIsInitialized} from './store/module/app';
import './components/layout-element.ts';

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
  }

  firstUpdated() {
    store.dispatch(setIsInitialized(true));
  }

  headerTemplate() {
    return html`<h1 slot="headerContent">
      ${!this.isInitialized ? 'Loading...' : 'Lit Scaffold'}
    </h1>`;
  }

  render() {
    return html`<layout-element pageTitle="Homepage"
      >${this.headerTemplate()}</layout-element
    >`;
  }
}

window.customElements.define('lit-scaffold', LitScaffold);
