import Abstract from "./abstract";


export default class Comment extends Abstract {

  getTemplate() {
    return `<ul class="film-details__comments-list"></ul>`;
  }
}
