import Abstract from "./abstract-view.js";
import dayjs from "dayjs";
import {parseToMinAndHours} from "../utils/common";

const DESCRIPTION_MAX_LENGTH = 140;
const DESCRIPTION_VISIBLE_LENGTH = 139;

export default class FilmCardView extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._filmDetailsElement = [];
    this._onOpenDetailsElements = this._onOpenDetailsElements.bind(this);
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
  }

  getTemplate() {
    const {poster, title, rating, release, runtime, genres, description, comments, isFavorite, isWatched, isWatchlist} = this._film;

    return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(release.date).format(`YYYY`)}</span>
      <span class="film-card__duration">${parseToMinAndHours(runtime)}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > DESCRIPTION_MAX_LENGTH ? `${description.substring(0, DESCRIPTION_VISIBLE_LENGTH)}...` : `${description}`}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
    </div>
  </article>`;
  }

  _filmOpenDetailsElement() {
    if (this._filmDetailsElement) {
      this._filmDetailsElement.push(this.getElement().querySelector(`.film-card__title`));
      this._filmDetailsElement.push(this.getElement().querySelector(`.film-card__poster`));
      this._filmDetailsElement.push(this.getElement().querySelector(`.film-card__comments`));
    }
    return this._filmDetailsElement;
  }

  _onOpenDetailsElements() {
    this._callback.openDetails(this._film);
  }

  _onAddWatchedClick(evt) {
    evt.preventDefault();
    this._callback.addWatchedClick();
  }

  _onAddWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.addWatchlistClick();
  }

  _onAddFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.addFavotiteClick();
  }

  setOpenDetailsClick(callback) {
    this._callback.openDetails = callback;
    this._filmOpenDetailsElement();
    this._filmDetailsElement.forEach((element) => {
      element.addEventListener(`click`, this._onOpenDetailsElements);
    });
  }

  setOnAddWachedClick(callback) {
    this._callback.addWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onAddWatchedClick);
  }

  setOnAddWatchlistClick(callback) {
    this._callback.addWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddWatchlistClick);
  }

  setOnAddFavoriteClick(callback) {
    this._callback.addFavotiteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onAddFavoriteClick);
  }
}

