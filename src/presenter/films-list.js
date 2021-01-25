import SortView from "../view/sort";
import FilmsContainerView from "../view/films-container";
import FilmsListView from "../view/films-list";
import FilmsPresenter from "./film";
import MoreButtonView from "../view/show-more-button";
import FilmsExtraListView from "../view/films-extra";
import NoFilmsView from "../view/no-films";
import {render, RenderPosition, remove} from "../utils/render";
import {filter} from "../utils/filter";
import {SortType, UserAction, UpdateType, FilterType, ExstraFilmsList} from "../const";
import {sortFilmsByDate, sortFilmsByRating} from "../utils/sort";


export default class FilmList {
  constructor(container, filmsModel, filtersModel) {
    this._container = container;

    // models
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;

    // components
    this._filmsListComponent = new FilmsListView();
    this._moreButtonComponent = new MoreButtonView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();

    // callback
    this._closePrevDetails = this._closePrevDetails.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onViewAction = this._onViewAction.bind(this);
    this._renderFilmsList = this._renderFilmsList.bind(this);

    // model
    this._filmsModel.addObserver(this._onModelEvent);
    this._filtersModel.addObserver(this._onModelEvent);

    // const
    this._NUM_RENDER_CARDS = 5;
    this._NUM_RENDERED_CARDS = 0;
    this._currentSortType = SortType.DEFAULT;
    this._currentfilter = FilterType.ALL_MOVIES;
  }

  init() {
    this._filmsPresenter = {};
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFilmsList();
    this._renderMoreButton();
    this._renderFilmsExtraList(ExstraFilmsList.TOP_RATED);
    this._renderFilmsExtraList(ExstraFilmsList.MOST_COMMENTED);
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
    const films = this._getFilms();
    if (films.length === 0) {
      this._renderNoFilms();
      return;
    }

    for (const film of films.slice(this._NUM_RENDERED_CARDS, this._NUM_RENDERED_CARDS + this._NUM_RENDER_CARDS)) {
      const filmsPresenter = new FilmsPresenter(this._filmsListComponent.filmsContainer, this._onViewAction, this._closePrevDetails);
      filmsPresenter.init(film);
      this._filmsPresenter[film.id] = filmsPresenter;
    }
    this._NUM_RENDERED_CARDS += this._NUM_RENDER_CARDS;
    if (this._NUM_RENDERED_CARDS >= this._getFilms().length) {
      remove(this._moreButtonComponent);
    }
    if (films.length <= this._NUM_RENDER_CARDS) {
      remove(this._moreButtonComponent);
    }

  }

  _renderFilmsExtraList(title) {
    const filmsExtraListComponent = new FilmsExtraListView(title);
    render(this._filmsContainerComponent, filmsExtraListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderMoreButton() {
    if (this._moreButtonComponent !== null) {
      this._moreButtonComponent = null;
    }

    this._moreButtonComponent = new MoreButtonView();
    this._moreButtonComponent.setOnMoreButtonChange(this._renderFilmsList);
    render(this._filmsListComponent.getElement(), this._moreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _clearFilmsList() {
    Object
      .values(this._filmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmsPresenter = {};
    remove(this._moreButtonComponent);
    this._NUM_RENDERED_CARDS = 0;
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmsList();
    this._renderMoreButton();
    this._renderFilmsList();
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
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
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmsPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmsList();
        this._renderFilmsList();
        this._renderMoreButton();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsList();
        this._renderFilmsList();
        this._renderMoreButton();
        break;
    }
  }

  _closePrevDetails() {
    Object
      .values(this._filmsPresenter)
      .forEach((movie) => {
        if (movie._isDetailsOpened) {
          movie._closeDetails();
        }
      });
  }
}
