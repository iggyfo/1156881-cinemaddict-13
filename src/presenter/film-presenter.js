import FilmCardView from "../view/film-card-view";
import DetailsPresenter from "./details-presenter";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {UserAction, UpdateType} from "../const";


export default class FilmPresenter {
  constructor(container, changeData, prevDetailsClose) {
    this._container = container;
    this._filmCardComponent = null;
    this._detailsPresenter = null;
    this._prevDetailsClose = prevDetailsClose;
    this._isDetailsOpened = false;
    this._changeData = changeData;

    this._changeData = this._changeData.bind(this);
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
    this._onDetailsClose = this._onDetailsClose.bind(this);
    this._initDetails = this._initDetails.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(this._film);
    this._filmCardComponent.setOnAddWachedClick(this._onAddWatchedClick);
    this._filmCardComponent.setOnAddWatchlistClick(this._onAddWatchlistClick);
    this._filmCardComponent.setOnAddFavoriteClick(this._onAddFavoriteClick);
    this._filmCardComponent.setOpenDetailsClick(this._initDetails);
    if (prevFilmComponent === null) {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filmCardComponent, prevFilmComponent);
    remove(prevFilmComponent);
  }

  _initDetails() {
    this._prevDetailsClose();
    this._isDetailsOpened = true;
    this._detailsPresenter = new DetailsPresenter(this._film, this._changeData, this._onDetailsClose);
    this._detailsPresenter.init();
  }

  _onAddWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
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
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
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
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _onDetailsClose() {
    this._isDetailsOpened = false;
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
