import Observer from "../utils/observer.js";
import {FilterType} from "../const.js";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL_MOVIES;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this.notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
