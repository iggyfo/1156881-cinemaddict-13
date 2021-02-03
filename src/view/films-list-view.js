import Abstract from "./abstract-view.js";


export default class FilmsListView extends Abstract {

  getTemplate() {
    return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>`;
  }

  getFilmsContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
