import Abstract from "./abstract-view.js";
import {SortType} from "../const";


export default class SortView extends Abstract {
  constructor() {
    super();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  getTemplate() {
    return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
  }

  set activeSortType(type) {
    this.getElement().querySelectorAll(`.sort__button`).forEach((element) => {
      element.classList.remove(`sort__button--active`);
      if (element.dataset.sortType === type) {
        element.classList.add(`sort__button--active`);
      }
    });
  }

  _removeActiveSortType() {
    this.getElement().querySelectorAll(`.sort__button`).forEach((element) => {
      element.classList.remove(`sort__button--active`);
    });
  }

  _onSortTypeChange(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._removeActiveSortType();
    evt.target.classList.add(`sort__button--active`);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setOnSortTypeChange(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
