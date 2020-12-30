import Abstract from "./abstract.js";


export default class FooterStatistics extends Abstract {

  getTemplate() {
    return `<p>${this._numberOfFilms} movies inside</p>`;
  }
}
