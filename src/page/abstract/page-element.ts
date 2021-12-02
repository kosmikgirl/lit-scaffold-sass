import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {RouteData, PageMetadata} from '../../data/type/index';
import {setPageTitle} from '../../store/module/app';
import store from '../../store/store';

export default abstract class PageElement extends LitElement {
  private _pageMetadata: PageMetadata = {
    title: '',
    description: '',
    banner: '',
    bannerAlt: '',
    contentType: '',
  };

  constructor(pageMetadata: PageMetadata) {
    super();
    this._pageMetadata = pageMetadata;
  }

  @property({type: Object})
  routeData: RouteData = {};

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(setPageTitle(this._pageMetadata));
  }
}
