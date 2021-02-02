import Abstract from "./abstract-view.js";


export default class FooterStatistics extends Abstract {
  constructor(numberOfFilms) {
    super();
    this._numberOfFilms = numberOfFilms;
  }

  getTemplate() {
    return `<p>${this._numberOfFilms} movies inside</p>`;
  }
}
