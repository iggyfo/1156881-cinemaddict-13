import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setAll(updateType, comments) {
    this._comments = comments.slice();
    this.notify(updateType);
  }

  getAll() {
    return this._comments;
  }
}
