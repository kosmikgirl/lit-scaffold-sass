import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {RouteData} from '../../data/type/route-types';

export default abstract class PageElement extends LitElement {
  @property({type: Object})
  routeData: RouteData = {};
}