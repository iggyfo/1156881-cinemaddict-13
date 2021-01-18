import FilmsListView from "../view/films-list";
import FilmsPresenter from "./film";
import MoreButtonView from "../view/show-more-button";
import FilmsExtraListView from "../view/films-extra";
import NoFilmsView from "../view/no-films";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";


export default class MovieList {
  constructor(container) {
    this._container = container;
    this._filmsListComponent = new FilmsListView();
    this._moreButtonComponent = new MoreButtonView();
    this._noFilmsComponent = new NoFilmsView();

    this._onFilmChange = this._onFilmChange.bind(this);
    this._closePrevDetails = this._closePrevDetails.bind(this);

    this._NUM_RENDER_CARDS = 5;
    this._NUM_RENDER_EXTRA_CARDS = 2;
    this._NUM_RENDERED_CARDS = 0;
  }

  init(films) {
    this._films = films;
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._filmsToRender = films.slice(0, this._NUM_CARDS_OF_FILMS);
    this._topRatedFilms = films.slice(this._NUM_CARDS_OF_FILMS, this._NUM_CARDS_OF_FILMS + this._NUM_CARDS_OF_EXTRA_FILM);
    this._mostCommentedFilms = films.slice(this._NUM_CARDS_OF_FILMS + this._NUM_CARDS_OF_EXTRA_FILM, this._films.length);
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._moviePresenter = {};

    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderShowMoreButton();
    this._moreButtonComponent.getElement().addEventListener(`click`, () => {
      this._renderFilmsList();
    });

    this._renderFilmsList();
    this._renderFilmsExtraList(`Top Rated`);
    this._renderFilmsExtraList(`Most Commented`);
  }

  _renderFilmsList() {
    for (const film of this._films.slice(this._NUM_RENDERED_CARDS, this._NUM_RENDERED_CARDS + this._NUM_RENDER_CARDS)) {
      const filmsPresenter = new FilmsPresenter(this._filmsListContainerElement, this._onFilmChange, this._closePrevDetails);
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
    render(this._container, filmsExtraListComponent, RenderPosition.BEFOREEND);
    // const filmsExtraListContainer = filmsExtraListComponent.getElement().querySelector(`.films-list__container`);
    // for (const film of this._films.slice(0, this._NUM_RENDER_EXTRA_CARDS)) {
    //   const moviePresenterExtra = new MoviePresenter(filmsExtraListContainer, this._onFilmExtraChange, this._closePrevDetails);
    //   moviePresenterExtra.init(film);
    //   this._moviePresenterExtra[film.id] = moviePresenterExtra;
    // }
  }

  _renderNoFilms() {
    render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent.getElement(), this._moreButtonComponent, RenderPosition.BEFOREEND);
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
