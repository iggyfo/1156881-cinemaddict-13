import Abstract from "./abstract-view.js";


export default class NoFilmsView extends Abstract {

  getTemplate() {
    return `<section class="films"><section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
    </section></section>`;
  }
}
