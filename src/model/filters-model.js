import Observer from "../utils/observer.js";
import {FilterType} from "../const.js";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL_MOVIES;
  }

  setAll(updateType, filter) {
    this._activeFilter = filter;
    this.notify(updateType, filter);
  }

  getAll() {
    return this._activeFilter;
  }
}
