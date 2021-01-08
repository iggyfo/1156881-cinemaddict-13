import Abstract from "./abstract.js";


export default class FilmsExtra extends Abstract {

  getTemplate() {
    return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>`;
  }
}
