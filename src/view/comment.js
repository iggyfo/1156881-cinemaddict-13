import Abstract from "./abstract.js";
import dayjs from "dayjs";


export default class Comment extends Abstract {
  constructor(comment) {
    super();
    this._comment = comment;
    this._onRemoveComment = this._onRemoveComment.bind(this);
  }

  getTemplate() {
    const {author, comment, date, emotion} = this._comment;

    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date).format(`YYYY/MM/DD HH:MM`)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }

  _onRemoveComment(evt) {
    evt.preventDefault();
    this._callback.removeComment(this._comment);
  }

  setOnRemoveComment(callback) {
    this._callback.removeComment = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._onRemoveComment);
  }
}
