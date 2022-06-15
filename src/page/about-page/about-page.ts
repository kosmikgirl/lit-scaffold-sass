import {html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {RouteDataParam} from '../../data/enum';
import PageElement from '../abstract/page-element';
import { css } from 'lit';
import styles from './about-page.scss';

@customElement('about-page')
export default class AboutPage extends PageElement {
  static styles = [ css([styles] as unknown as TemplateStringsArray) ];

  @property({type: {message: String, subtitle: String}})
  foaas = { message: '', subtitle: ''};

  @property({type: String})
  inputName = '';

  @property({type: String})
  personName = '';

  constructor() {
    super({title: 'About'});
  }

  render() {
    return html`<div>
    
      <h2>
        AboutPage ${this.routeData?.[RouteDataParam.ID] || 'no id'}
      </h2>

      ${this.inputName}

        <p>Please, insert your name!</p>
        <input @input=${this.changeName} type="text"></input>

        <p>Who do you want to tell to f*ck off?</p>
        <input @input=${this.changePersonName} type="text"></input>
        <button @click=${this.handleClick} class="btn">Tell ${this.personName ? this.personName : 'Pepito'} to fuck off</button>


      <h1>${this.foaas.message}</h1>
      <p><em>${this.foaas.subtitle}</em></p>
    
    </div>`;
  }

  private changeName(event: Event){
    const input = event.target as HTMLInputElement;
    this.inputName = input.value;
  }

  private changePersonName(event: Event){
    const input = event.target as HTMLInputElement;
    this.personName = input.value;
  }

  private randomInArray(arr: Array<String>){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private handleClick() {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }

    const wordsFromAndName = ['off', 'you', 'donut', 'shakespeare', 'linus', 'king', 'chainsaw'];
    const wordsName = ['this', 'that', 'everything', 'everyone', 'pink', 'life', 'thanks'];


    if (this.personName.length > 0 && this.inputName.length > 0) {
      const randElement = this.randomInArray(wordsFromAndName);
      fetch(`https://www.foaas.com/${randElement}/${this.personName}/${this.inputName}`, options)
      .then( res => res.json() )
      .then( data => this.foaas = data)
    } else {
      const randElement = this.randomInArray(wordsName);
      fetch(`https://www.foaas.com/${randElement}/${this.inputName}`, options)
      .then( res => res.json() )
      .then( data => this.foaas = data)
    }

  }
}
