import {html, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {msg as localize, localized} from '@lit/localize/lit-localize';
import PageElement from '../abstract/page-element';
import { css } from 'lit';
import styles from './home-page.scss';



@localized()
@customElement('home-page')
export default class HomePage extends PageElement {
  static styles = [ css([styles] as unknown as TemplateStringsArray) ];

  @property({type: Array})
  characters = [];


  constructor() {
    super({title: 'Home'});
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    console.log(this.characters);
  }

  render() {
    return html`<div>
    
    <h2>${localize('HomePage')}</h2>

    <button @click=${this.clickHandler}>
    ${this.characters.length === 0 ? 'Get the characters' : 'Hide the characters' }
    </button>

    ${this.characters.map((item: {name: string}) => html`<p>${item.name}</p>`)}
    
    </div>`;
  }


  private clickHandler(e: MouseEvent) {
    console.log(e);
    if (this.characters.length === 0) {
      fetch('http://hp-api.herokuapp.com/api/characters').then( resp => resp.json() ).then( data => this.characters = data );
    } else {
      this.characters = [];
    }
  }



}
