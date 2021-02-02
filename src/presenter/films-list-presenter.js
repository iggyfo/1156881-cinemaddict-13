import SortView from "../view/sort-view";
import FilmsContainerView from "../view/films-container-view";
import FilmsListView from "../view/films-list-view";
import FilmsPresenter from "./film-presenter";
import MoreButtonView from "../view/show-more-button-view";
import NoFilmsView from "../view/no-films-view";
import LoadingView from "../view/loading-view";
import {render, RenderPosition, remove} from "../utils/render";
import {filter} from "../utils/filter";
import {SortType, UserAction, UpdateType, FilterType} from "../const";
import {sortFilmsByDate, sortFilmsByRating} from "../utils/sort";


export default class FilmListPresenter {
  constructor(container, filmsModel, filtersModel, api, userRankComponent) {
    this._container = container;
    this._userRankComponent = userRankComponent;
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._isLoading = true;
    this._api = api;
    this._filmsListComponent = new FilmsListView();
    this._moreButtonComponent = new MoreButtonView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._loadingComponent = new LoadingView();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onViewAction = this._onViewAction.bind(this);
    this._renderFilmsList = this._renderFilmsList.bind(this);
    this._renderFilms = this._renderFilms.bind(this);
    this._closePrevDetails = this._closePrevDetails.bind(this);

    this._filmsModel.addObserver(this._onModelEvent);
    this._filtersModel.addObserver(this._onModelEvent);

    this._NUM_RENDER_CARDS = 5;
    this._NUM_RENDERED_CARDS = 0;
    this._currentSortType = SortType.DEFAULT;
    this._currentfilter = FilterType.ALL_MOVIES;
  }

  init() {
    this._filmsPresenter = {};
    this._renderFilmsList();
  }

  _getFilms() {
    const filterType = this._filtersModel.getFilter();
    if (this._currentfilter !== filterType) {
      this._currentSortType = SortType.DEFAULT;
      this._sortComponent.activeSortType = SortType.DEFAULT;
      this._currentfilter = filterType;
    }
    const films = this._filmsModel.films;
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortFilmsByDate);
      case SortType.RATING:
        return filtredFilms.sort(sortFilmsByRating);
    }
    return filtredFilms;
  }

  _renderFilmsContainer() {
    render(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    this._renderSort();
    this._renderFilmsContainer();
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    if (this._noFilmsComponent) {
      this.destroy(this._noFilmsComponent);
    }
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilms();
    this._renderMoreButton();
  }

  _renderFilms() {
    const films = this._getFilms();
    for (const film of films.slice(this._NUM_RENDERED_CARDS, this._NUM_RENDERED_CARDS + this._NUM_RENDER_CARDS)) {
      const filmsPresenter = new FilmsPresenter(this._filmsListComponent.filmsContainer, this._onViewAction, this._closePrevDetails);
      filmsPresenter.init(film);
      this._filmsPresenter[film.id] = filmsPresenter;
    }
    this._NUM_RENDERED_CARDS += this._NUM_RENDER_CARDS;
    if (this._NUM_RENDERED_CARDS >= this._getFilms().length) {
      remove(this._moreButtonComponent);
    }
  }

  _renderNoFilms() {
    render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._container, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderMoreButton() {
    if (this._getFilms().length <= this._NUM_RENDER_CARDS) {
      remove(this._moreButtonComponent);
      return;
    }
    if (this._moreButtonComponent !== null) {
      this._moreButtonComponent = null;
    }
    this._moreButtonComponent = new MoreButtonView();
    this._moreButtonComponent.setOnMoreButtonChange(this._renderFilms);
    render(this._filmsListComponent.getElement(), this._moreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView();
    this._sortComponent.activeSortType = this._currentSortType;
    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _clearFilmsList() {
    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmsPresenter = {};
    this._NUM_RENDERED_CARDS = 0;
    remove(this._sortComponent);
    remove(this._filmsContainerComponent);
    remove(this._filmsListComponent);
    remove(this._loadingComponent);
    remove(this._moreButtonComponent);
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
      case UserAction.ADD_FILM:
        this._filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_FILM:
        this._filmsModel.deleteFilm(updateType, update);
        break;
    }
  }

  _onModelEvent(updateType, data) {
    if (this._currentfilter !== FilterType.ALL_MOVIES) {
      updateType = UpdateType.MINOR;
    }
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmsPresenter[data.id].init(data);
        this._userRankComponent.setRank(this._filmsModel.films);
        break;
      case UpdateType.MINOR:
        this._clearFilmsList();
        this._renderFilmsList();
        this._userRankComponent.setRank(this._filmsModel.films);
        break;
      case UpdateType.MAJOR:
        this._clearFilmsList();
        this._renderFilmsList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._sortComponent);
        remove(this._filmsContainerComponent);
        remove(this._filmsListComponent);
        remove(this._loadingComponent);
        this._renderFilmsList();
        this._userRankComponent.setRank(this._filmsModel.films);
        break;
    }
  }

  _closePrevDetails() {
    Object
      .values(this._filmsPresenter)
      .forEach((film) => {
        if (film._isDetailsOpened) {
          film._isDetailsOpened = false;
          film._detailsPresenter._closeDetails();
        }
      });
  }

  hide() {
    this._onSortTypeChange(SortType.DEFAULT);
    this._sortComponent.hide();
    this._filmsContainerComponent.hide();
    this._noFilmsComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._filmsContainerComponent.show();
    this._noFilmsComponent.show();
  }

  destroy(component) {
    remove(component);
  }
}
