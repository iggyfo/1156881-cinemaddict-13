import FilmCard from "../view/film-card";
import Details from "../view/details";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {constants} from "../utils/constants.js";

export default class Movie {
  constructor(container, changeData, prevDetails) {
    this._container = container;
    this._filmCardComponent = null;
    this._detailsComponent = null;
    this._changeData = changeData;
    this._prevDetails = prevDetails;
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
    this._onDetailsClick = this._onDetailsClick.bind(this);
    this._onDetailsEscKeydown = this._onDetailsEscKeydown.bind(this);
  }

  init(film) {
    this._film = film;
    this._isDetailsOpened = false;
    const prevFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmCardComponent.setOnAddWachedClick(this._onAddWatchedClick);
    this._filmCardComponent.setOnAddWatchlistClick(this._onAddWatchlistClick);
    this._filmCardComponent.setOnAddFavoriteClick(this._onAddFavoriteClick);
    this._filmCardComponent.setClickHandler(this._onDetailsClick);

    if (prevFilmComponent === null) {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      replace(this._filmCardComponent, prevFilmComponent);
    }
    if (this._detailsComponent) {
      if (document.body.contains(this._detailsComponent.getElement())) {
        this._onDetailsClick();
      }
    }
    remove(prevFilmComponent);
  }

  _onDetailsClick() {
    this._prevDetails();
    const prevDetailsComponent = this._detailsComponent;
    this._detailsComponent = new Details(this._film);
    this._detailsComponent.setOnDetailsAddWachedClick(this._onAddWatchedClick);
    this._detailsComponent.setOnDetailsAddWatchlistClick(this._onAddWatchlistClick);
    this._detailsComponent.setOnDetailsAddFavoriteClick(this._onAddFavoriteClick);
    this._detailsComponent.closeBtnElement.addEventListener(`click`, () => {
      this._closeDetails();
    });

    document.addEventListener(`keydown`, this._onDetailsEscKeydown);

    if (!document.body.contains(this._detailsComponent.getElement())) {
      document.body.appendChild(this._detailsComponent.getElement());
      document.body.classList.add(`hide-overflow`);
      this._isDetailsOpened = true;
    } else {
      replace(this._detailsComponent, prevDetailsComponent);
    }
    if (prevDetailsComponent) {
      remove(prevDetailsComponent);
    }
  }

  _onDetailsEscKeydown(evt) {
    if (evt.key === constants.ESC) {
      this._closeDetails();
    }
  }

  _closeDetails() {
    this._isDetailsOpened = false;
    this._detailsComponent.getElement().remove();
    this._detailsComponent.removeElement();
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onDetailsEscKeydown);
  }

  _onAddWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _onAddWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _onAddFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
