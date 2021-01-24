import SmartView from "../view/smart";
import dayjs from "dayjs";
import {parseToMinAndHours} from "../utils/common";


export default class Details extends SmartView {
  constructor(film) {
    super();
    this._data = Details.parseFilmToData(film);
    this._onDetailsAddWatchedClick = this._onDetailsAddWatchedClick.bind(this);
    this._onDetailsAddWatchlistClick = this._onDetailsAddWatchlistClick.bind(this);
    this._onDetailsAddFavoriteClick = this._onDetailsAddFavoriteClick.bind(this);
    this._onEmojiClick = this._onEmojiClick.bind(this);
    this._onCloseDetails = this._onCloseDetails.bind(this);
    this._setInnerHandlers();
    this._currentScrollTop = 0;
  }

  getTemplate() {
    const {poster, ageRating, title, originalTitle, rating, producer, screenwriters, cast, release, runtime, genres, description, comments, isFavorite, isWatched, isWatchlist, emotion} = this._data;


    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${producer}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${cast}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dayjs(release.date).format(`DD MMMM YYYY`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${parseToMinAndHours(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list"></ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              <img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          emotion: `smile`,
        }
    );
  }

  static parseDataToFilm(data) {
    const film = Object.assign({}, data);
    delete film.emotion;

    return film;
  }

  restoreHandlers() {
    this.getElement().scrollTop = this._currentCoords;
    this._setInnerHandlers();
    this.setOnFormSubmit(this._callback.formSubmit);
    this.setOnDetailsAddWatchedClick(this._callback.addDetailsWatchedClick);
    this.setOnDetailsAddWatchlistClick(this._callback.addDetailsWatchlistClick);
    this.setOnDetailsAddFavoriteClick(this._callback.addDetailsFavotiteClick);
    this.setOnCloseBtn(this._callback.closeDetails);
  }

  get commentList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelectorAll(`.film-details__emoji-item`)
    .forEach((element) => {
      element.addEventListener(`click`, this._onEmojiClick);
    });
  }

  _onEmojiClick(evt) {
    evt.preventDefault();
    this._currentCoords = this.getElement().scrollTop;
    this.updateData({
      emotion: evt.target.value,
    });
    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((element) => {
      if (element.value === evt.target.value) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Details.parseDataToFilm);
  }

  _onDetailsAddWatchedClick(evt) {
    evt.preventDefault();
    this._callback.addDetailsWatchedClick();
  }

  _onDetailsAddWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.addDetailsWatchlistClick();
  }

  _onDetailsAddFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.addDetailsFavotiteClick();
  }

  _onCloseDetails(evt) {
    evt.preventDefault();
    this._callback.closeDetails();
  }

  setOnDetailsAddWatchedClick(callback) {
    this._callback.addDetailsWatchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._onDetailsAddWatchedClick);
  }

  setOnDetailsAddWatchlistClick(callback) {
    this._callback.addDetailsWatchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._onDetailsAddWatchlistClick);
  }

  setOnDetailsAddFavoriteClick(callback) {
    this._callback.addDetailsFavotiteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._onDetailsAddFavoriteClick);
  }

  setOnFormSubmit(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmit);
  }

  setOnCloseBtn(callback) {
    this._callback.closeDetails = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseDetails);
  }
}
