import Abstract from "./abstract-view.js";


export default class LoadingView extends Abstract {

  getTemplate() {
    return `<section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
    </section>`;
  }
}
