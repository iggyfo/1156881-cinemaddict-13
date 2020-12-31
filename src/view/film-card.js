import Abstract from "./abstract.js";


export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._filmShowDetailsElement = [];
  }

  getTemplate() {
    const {poster, title, rating, release, duration, genres, description, comments} = this._film;

    return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${release}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
  }

  get filmShowDetailsElement() {
    if (this._filmShowDetailsElement) {
      this._filmShowDetailsElement.push(this.getElement().querySelector(`.film-card__title`));
      this._filmShowDetailsElement.push(this.getElement().querySelector(`.film-card__poster`));
      this._filmShowDetailsElement.push(this.getElement().querySelector(`.film-card__comments`));
    }
    return this._filmShowDetailsElement;
  }
}

