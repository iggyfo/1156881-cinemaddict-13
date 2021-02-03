import SmartView from "./smart-view";
import {FilterType} from "../const";


export default class DetailsControlsView extends SmartView {
  constructor(film) {
    super();
    this._data = DetailsControlsView.parseFilmToDetailsControls(film);
    this._onDetailsControlsClick = this._onDetailsControlsClick.bind(this);
    this._onChangeActiveControls = this._onChangeActiveControls.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    const {isWatchlist, isWatched, isFavorite} = this._data;
    return `<section class="film-details__controls">
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="Watchlist" ${isWatchlist ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="Watched" ${isWatched ? `checked` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="Favorites" ${isFavorite ? `checked` : ``}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  </section>`;
  }

  static parseFilmToDetailsControls(film) {
    return Object.assign(
        {},
        film,
        {
          isWatchlist: film.isWatchlist,
          isWatched: film.isWatched,
          isFavorite: film.isFavorite,
        }
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`.film-details__control-input`)
      .forEach((control) => {
        control.addEventListener(`click`, this._onChangeActiveControls);
      });
    this.getElement()
      .querySelectorAll(`.film-details__control-input`)
      .forEach((control) => {
        control.addEventListener(`click`, this._onDetailsControlsClick);
      });
  }

  _onChangeActiveControls(evt) {
    switch (evt.target.name) {
      case FilterType.WATCH_LIST:
        this.updateData(
            {
              isWatchlist: !this._data.isWatchlist
            }
        );
        break;
      case FilterType.WATCHED:
        this.updateData(
            {
              isWatched: !this._data.isWatched
            }
        );
        break;
      case FilterType.FAVORITES:
        this.updateData(
            {
              isFavorite: !this._data.isFavorite
            }
        );
        break;
    }
  }

  setOnDetailsControlsClick(callback) {
    this._callback.onDetailsControlsClick = callback;
    this.getElement()
      .querySelectorAll(`.film-details__control-input`)
      .forEach((control) => {
        control.addEventListener(`click`, this._onDetailsControlsClick);
      });
  }

  _onDetailsControlsClick() {
    this._callback.onDetailsControlsClick(this._data);
  }
}
