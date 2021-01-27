import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, comments) {
    this._comments = comments.slice();
    this.notify(updateType);
  }

  get comments() {
    return this._comments;
  }

  updateComments(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting Comments`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      update,
      ...this._comments.slice(index + 1)
    ];

    this.notify(updateType, update);
  }

  addComments(updateType, update) {
    this._comments = [
      update,
      ...this._comments
    ];

    this.notify(updateType, update);
  }

  deleteComments(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this.notify(updateType);
  }
}
