import FilterView from "../view/filter";
import SortView from "../view/sort";
import FilmsContainerView from "../view/films-container";
import FilmsListView from "../view/films-list";
import FilmsPresenter from "./film";
import MoreButtonView from "../view/show-more-button";
import FilmsExtraListView from "../view/films-extra";
import NoFilmsView from "../view/no-films";
import {render, RenderPosition, remove} from "../utils/render";
import {updateItem} from "../utils/common";
import {SortType} from "../const";
import {sortFilmsByDate, sortFilmsByRating} from "../utils/sort";


export default class MovieList {
  constructor(container, filmsModel, filters) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filters = filters;
    // components
    this._filmsListComponent = new FilmsListView();
    this._moreButtonComponent = new MoreButtonView();
    this._noFilmsComponent = new NoFilmsView();
    this._filtersComponent = new FilterView(this._filters);
    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();

    // callback
    this._onFilmChange = this._onFilmChange.bind(this);
    this._closePrevDetails = this._closePrevDetails.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    // const
    this._NUM_RENDER_CARDS = 5;
    this._NUM_RENDERED_CARDS = 0;
    this._currentSortType = SortType.DEFAULT;
  }

  init() {
    this._moviePresenter = {};
    render(this._container, this._filtersComponent, RenderPosition.BEFOREEND);
    this._renderSort();
    render(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderFilmsList();
    this._renderMoreButton();
    this._renderFilmsExtraList(`Top Rated`);
    this._renderFilmsExtraList(`Most Commented`);
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        this._filmsModel.films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this._filmsModel.films.sort(sortFilmsByRating);
        break;
    }
    return this._filmsModel.films;
  }

  _renderFilmsList() {
    const films = this._getFilms();
    if (films.length === 0) {
      this._renderNoFilms();
      return;
    }

    for (const film of films.slice(this._NUM_RENDERED_CARDS, this._NUM_RENDERED_CARDS + this._NUM_RENDER_CARDS)) {
      const filmsPresenter = new FilmsPresenter(this._filmsListComponent.filmsContainer, this._onFilmChange, this._closePrevDetails);
      filmsPresenter.init(film);
      this._moviePresenter[film.id] = filmsPresenter;
    }
    this._NUM_RENDERED_CARDS += this._NUM_RENDER_CARDS;
    if (this._NUM_RENDERED_CARDS >= films.length) {
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
    render(this._filmsListComponent.getElement(), this._moreButtonComponent, RenderPosition.BEFOREEND);
    this._moreButtonComponent.getElement().addEventListener(`click`, () => {
      this._renderFilmsList();
    });
  }

  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange);
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

  _clearFilmsList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    remove(this._moreButtonComponent);
    this._NUM_RENDERED_CARDS = 0;
  }

  _onFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._moviePresenter[updatedFilm.id].init(updatedFilm);
  }

  _closePrevDetails() {
    Object
      .values(this._moviePresenter)
      .forEach((movie) => {
        if (movie._isDetailsOpened) {
          movie._closeDetails();
        }
      });
  }
}
