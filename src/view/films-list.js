import Abstract from "./abstract.js";


export default class FilmsList extends Abstract {

  getTemplate() {
    return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>`;
  }

  get filmsContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
