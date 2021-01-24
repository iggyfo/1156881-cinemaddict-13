import Abstract from "./abstract.js";


export default class MoreButton extends Abstract {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setOnMoreButtonChange(callback) {
    this._callback.renderFilmList = callback;
    this.getElement().addEventListener(`click`, callback);
  }
}
