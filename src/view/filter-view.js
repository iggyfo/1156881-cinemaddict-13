import Abstract from "./abstract-view";
import {FilterType, MenuItem} from "../const";

export default class FilterView extends Abstract {
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
    return `<div class="main-navigation__items">
      <a href="#all" data-id="${MenuItem.FILMS}" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" data-id="${MenuItem.FILMS}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" data-id="${MenuItem.FILMS}" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" data-id="${MenuItem.FILMS}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
    </div>`;
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

