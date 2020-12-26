import {createElement} from "../utils.js";


export default class FooterStatistics {
  constructor(numberOfFilms) {
    this._numberOfFilms = numberOfFilms;
    this._element = null;
  }

  getTemplate() {
    return `<p>${this._numberOfFilms} movies inside</p>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
