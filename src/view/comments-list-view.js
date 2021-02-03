import Abstract from "./abstract-view";


export default class CommentView extends Abstract {

  getTemplate() {
    return `<ul class="film-details__comments-list"></ul>`;
  }
}
