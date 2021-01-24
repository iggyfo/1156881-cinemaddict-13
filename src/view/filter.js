import Abstract from "./abstract.js";

export default class Filter extends Abstract {
  constructor(filmsFilter, currentFilterType) {
    super();
    this._filters = filmsFilter;
    this._currentFilterType = currentFilterType;
    this._onfilterTypeChange = this._onfilterTypeChange.bind(this);
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

  _onfilterTypeChange(evt) {
    evt.preventDefault();
    if (evt.target.innerText.includes(`Watchlist`)) {
      this._currentFilterType = `Watchlist`;
    } else if (evt.target.innerText.includes(`History`)) {
      this._currentFilterType = `History`;
    } else if (evt.target.innerText.includes(`Favorites`)) {
      this._currentFilterType = `Favorites`;
    } else {
      this._currentFilterType = `All movies`;
    }
    this._callback.filterTypeChange(this._currentFilterType);
  }

  setOnFilterTypeChange(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onfilterTypeChange);
  }
}

