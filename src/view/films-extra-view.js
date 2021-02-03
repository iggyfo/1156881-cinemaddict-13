import Abstract from "./abstract-view.js";


export default class FilmsExtraView extends Abstract {
  constructor(listTitle) {
    super();
    this._listTitle = listTitle;
  }

  getTemplate() {
    return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${this._listTitle}</h2>
    <div class="films-list__container"></div>
  </section>`;
  }
}
