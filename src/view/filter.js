import Abstract from "./abstract";
import {FilterType} from "../const";

export default class Filter extends Abstract {
  constructor(filmsFilter, currentFilterType) {
    super();
    this._filters = filmsFilter;
    this._currentFilterType = currentFilterType;
    this._onfilterTypeChange = this._onfilterTypeChange.bind(this);
    this._removeActiveFilter();
    this._changeActiveFilter();
  }

  getTemplate() {
    const {watchlist, favorites, history} = this._filters;
    return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
  }

  _removeActiveFilter() {
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((element) => {
      element.classList.remove(`main-navigation__item--active`);
    });
  }

  _changeActiveFilter() {
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((element) => {
      if (element.innerText.includes(this._currentFilterType)) {
        element.classList.add(`main-navigation__item--active`);
      }
    });
  }

  _onfilterTypeChange(evt) {
    evt.preventDefault();
    if (evt.target.innerText.includes(FilterType.WATCH_LIST)) {
      this._currentFilterType = FilterType.WATCH_LIST;
    } else if (evt.target.innerText.includes(FilterType.HISTORY)) {
      this._currentFilterType = FilterType.HISTORY;
    } else if (evt.target.innerText.includes(FilterType.FAVORITES)) {
      this._currentFilterType = FilterType.FAVORITES;
    } else {
      this._currentFilterType = FilterType.ALL_MOVIES;
    }
    this._removeActiveFilter();
    evt.target.classList.add(`main-navigation__item--active`);

    this._callback.filterTypeChange(this._currentFilterType);
  }

  setOnFilterTypeChange(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onfilterTypeChange);
  }
}

