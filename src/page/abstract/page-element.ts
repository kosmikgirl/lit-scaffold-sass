import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {RouteData} from '../../data/type/route-types';
import {PageMetadata} from '../../data/type/seo';
import {setPageMetadata} from '../../store/module/app';
import store from '../../store/store';

export default abstract class PageElement extends LitElement {
  private _pageMetadata: PageMetadata = {
    title: '',
  };

  constructor(pageMetadata: PageMetadata) {
    super();
    this._pageMetadata = pageMetadata;
  }

  @property({type: Object})
  routeData: RouteData = {};

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(setPageMetadata(this._pageMetadata));
  }
}
