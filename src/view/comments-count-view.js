import Abstract from "./abstract-view.js";


export default class CommentCountView extends Abstract {
  constructor(numOfcomments) {
    super();
    this._numOfcomments = numOfcomments;
  }

  getTemplate() {
    return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._numOfcomments}</span></h3>`;
  }
}
