import Abstract from "./abstract-view.js";
import dayjs from "dayjs";
import {UserAction, UpdateType} from "../const";


export default class CommentView extends Abstract {
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
    this.getElement().querySelector(`.film-details__comment-delete`).textContent = `Deleting...`;
    this.getElement().querySelector(`.film-details__comment-delete`).disabled = true;
    this._callback.removeComment(
        UserAction.DELETE_COMMENT,
        UpdateType.DELETE_COMMENT,
        this._comment
    );
  }

  setOnRemoveComment(callback) {
    this._callback.removeComment = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._onRemoveComment);
  }
}
