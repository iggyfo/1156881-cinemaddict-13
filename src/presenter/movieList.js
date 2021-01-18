import MovieListView from "../view/films-list";
import MoviePresenter from "./movie";
import MoreButtonView from "../view/show-more-button";
import FilmsExtraListView from "../view/films-extra";
import NoMoviesView from "../view/no-movies";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";


export default class MovieList {
  constructor(container) {
    this._container = container;
    this._filmsListComponent = new MovieListView();
    this._moreButtonComponent = new MoreButtonView();
    this._noMovieComponent = new NoMoviesView();

    this._onFilmChange = this._onFilmChange.bind(this);
    this._onFilmExtraChange = this._onFilmExtraChange.bind(this);
    this._closePrevDetails = this._closePrevDetails.bind(this);

    this._NUM_RENDER_CARDS = 5;
    this._topRatedFilms = [];
    this._mostCommentedFilm = [];
    this._NUM_RENDERD_CARDS = [];
  }

  init(films) {
    this._films = films;
    if (this._films.length === 0) {
      this._renderNoMovies();
      return;
    }
    this._filmsToRender = films.slice(0, this._NUM_CARDS_OF_FILMS);
    this._topRatedFilms = films.slice(this._NUM_CARDS_OF_FILMS, this._NUM_CARDS_OF_FILMS + this._NUM_CARDS_OF_EXTRA_FILM);
    this._mostCommentedFilms = films.slice(this._NUM_CARDS_OF_FILMS + this._NUM_CARDS_OF_EXTRA_FILM, this._films.length);
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._moviePresenter = {};
    this._moviePresenterExtra = {};

    this._renderFilmsList();
    this._renderFilmsExtraList(`Top Rated`, this._topRatedFilms);
    this._renderFilmsExtraList(`Most Commented`, this._mostCommentedFilms);
  }

  _renderNoMovies() {
    render(this._container, this._noMovieComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    if (this._NUM_CARDS_OF_FILMS === this._filmsToRender.length) {
      render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);
      this._renderShowMoreButton();
      this._moreButtonComponent.getElement().addEventListener(`click`, () => {
        this._renderFilmsList();
      });
    }
    for (const film of this._filmsToRender.slice(0, this._NUM_RENDER_CARDS)) {
      const moviePresenter = new MoviePresenter(this._filmsListContainerElement, this._onFilmChange, this._closePrevDetails);
      moviePresenter.init(film);
      this._moviePresenter[film.id] = moviePresenter;
    }
    this._filmsToRender.splice(0, this._NUM_RENDER_CARDS);
    if (this._filmsToRender.length === 0) {
      remove(this._moreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent.getElement(), this._moreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsExtraList(title, films) {
    const filmsExtraListComponent = new FilmsExtraListView(title);
    const filmsExtraListContainer = filmsExtraListComponent.getElement().querySelector(`.films-list__container`);
    render(this._container, filmsExtraListComponent, RenderPosition.BEFOREEND);
    for (const film of films) {
      const moviePresenterExtra = new MoviePresenter(filmsExtraListContainer, this._onFilmExtraChange, this._closePrevDetails);
      moviePresenterExtra.init(film);
      this._moviePresenterExtra[film.id] = moviePresenterExtra;
    }
  }

  _clearFilmsList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    remove(this._moreButtonComponent);
  }

  _onFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._moviePresenter[updatedFilm.id].init(updatedFilm);
  }

  _onFilmExtraChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._moviePresenterExtra[updatedFilm.id].init(updatedFilm);
  }

  _closePrevDetails() {
    Object
      .values(this._moviePresenter)
      .forEach((movie) => {
        if (movie._isDetailsOpened) {
          movie._closeDetails();
        }
      });

    Object
      .values(this._moviePresenterExtra)
      .forEach((movie) => {
        if (movie._isDetailsOpened) {
          movie._closeDetails();
        }
      });
  }
}
