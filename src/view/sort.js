import Abstract from "./abstract.js";
import {SortType} from "../const";


export default class Sort extends Abstract {
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

  _onSortTypeChange(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this.getElement().querySelectorAll(`.sort__button`).forEach((element) => {
      element.classList.remove(`sort__button--active`);
    });
    evt.target.classList.add(`sort__button--active`);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setOnSortTypeChange(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
