import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {setPageMetadata} from '../../store/module/app';
import {RouteData, PageMetadata} from '../../data/type/';
import store from '../../store/store';

export default abstract class PageElement extends LitElement {
  readonly _pageMetadata: PageMetadata = {
    title: '',
    description: '',
    banner: '',
    bannerAlt: '',
    contentType: '',
  };

  protected constructor(pageMetadata: PageMetadata) {
    super();
    this._pageMetadata = pageMetadata;
  }

  @property({type: Object}) routeData: RouteData = {};

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(setPageMetadata(this._pageMetadata));
  }
}
