import {html, css, LitElement} from 'lit';
import {state} from 'lit/decorators.js';
import {connect} from 'pwa-helpers';
import store from './store/store';
import {AppState, setIsInitialized} from './store/module/app';
import {RouteNames} from './router/routes';
import './component/router-link';
import './component/router-element';

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
          .to=${{name: RouteNames.ABOUT, routeProps: {id: 'demo'}}} 
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
