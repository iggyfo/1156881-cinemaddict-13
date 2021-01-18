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
  constructor(container, filters) {
    this._container = container;
    this._filters = filters;
    this._filmsListComponent = new FilmsListView();
    this._moreButtonComponent = new MoreButtonView();
    this._noFilmsComponent = new NoFilmsView();
    this._filtersComponent = new FilterView(this._filters);
    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();

    this._onFilmChange = this._onFilmChange.bind(this);
    this._closePrevDetails = this._closePrevDetails.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._NUM_RENDER_CARDS = 5;
    this._NUM_RENDERED_CARDS = 0;
    this._currentSortType = SortType.DEFAULT;
  }

  init(films) {
    this._films = films;
    this._sourcedFilms = films.slice();
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._moviePresenter = {};
    render(this._container, this._filtersComponent, RenderPosition.BEFOREEND);
    this._renderSort();
    render(this._container, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderMoreButton();
    this._renderFilmsList();
    this._renderFilmsExtraList(`Top Rated`);
    this._renderFilmsExtraList(`Most Commented`);
  }

  _renderFilmsList() {
    for (const film of this._films.slice(this._NUM_RENDERED_CARDS, this._NUM_RENDERED_CARDS + this._NUM_RENDER_CARDS)) {
      const filmsPresenter = new FilmsPresenter(this._filmsListComponent.filmsContainer, this._onFilmChange, this._closePrevDetails);
      filmsPresenter.init(film);
      this._moviePresenter[film.id] = filmsPresenter;
    }
    this._NUM_RENDERED_CARDS += this._NUM_RENDER_CARDS;
    if (this._NUM_RENDERED_CARDS >= this._films.length) {
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

  _sortFilms(sortType) {
    const withoutsortdate = [];
    const withoutsortrating = [];
    this._films.forEach((elem) => {
      withoutsortdate.push(elem.date);
      withoutsortrating.push(elem.rating);
    });
    switch (sortType) {
      case SortType.DATE:
        const date = [];
        console.log(`Without sort by date ` + withoutsortdate);
        this._films.sort(sortFilmsByDate);
        this._films.forEach((elem) => {
          date.push(` ` + elem.date);
        });
        console.log(`By date ` + date);
        break;
      case SortType.RATING:
        const rating = [];
        console.log(`Without sort by riting ` + withoutsortrating);
        this._films.sort(sortFilmsByRating);
        this._films.forEach((elem) => {
          rating.push(elem.rating);
        });
        console.log(`By rating ` + rating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }
    this._currentSortType = sortType;
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
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
