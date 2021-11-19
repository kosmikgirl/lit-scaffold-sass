import { html, css, LitElement } from 'lit'

export class LitScaffold extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 20px;
        max-width: 60%;
        margin: 0 auto;
      }
    `
  }

  render() {
    return html`
      <h1>Lit Scaffold</h1>
    `
  }
}

window.customElements.define('lit-scaffold', LitScaffold)
