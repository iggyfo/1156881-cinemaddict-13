import FilmsList from "../view/films-list";
import Movie from "./movie";
import MoreButton from "../view/show-more-button";
import FilmsExtraList from "../view/films-extra";
import NoMovies from "../view/no-movies";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";


export default class MovieList {
  constructor(container) {
    this._container = container;
    this._filmsList = new FilmsList();
    this._moreButton = new MoreButton();
    this._noMovie = new NoMovies();

    this._onFilmChange = this._onFilmChange.bind(this);
    this._NUM_CARDS_OF_EXTRA_FILM = 2;
    this._NUM_RENDER_CARDS = 5;
    this._topRatedFilms = [];
    this._mostCommentedFilm = [];
    this._filmsToRender = [];
  }

  init(films) {
    this._films = films;
    if (this._films.length === 0) {
      this._renderNoMovies();
      return;
    } else {
      this._filmsToRender = films.slice();
      this._topRatedFilms = films.slice(0, this._NUM_CARDS_OF_EXTRA_FILM);
      this._mostCommentedFilms = films.slice(this._NUM_CARDS_OF_EXTRA_FILM, this._NUM_CARDS_OF_EXTRA_FILM + this._NUM_CARDS_OF_EXTRA_FILM);
      this._filmsListContainerElement = this._filmsList.getElement().querySelector(`.films-list__container`);
      this._moviePresenter = {};
      this._renderFilmsList();
      this._renderFilmsExtraList(`Top Rated`, this._topRatedFilms);
      this._renderFilmsExtraList(`Most Commented`, this._mostCommentedFilms);
    }
  }

  _renderNoMovies() {
    render(this._container, this._noMovie, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    if (this._films.length === this._filmsToRender.length) {
      render(this._container, this._filmsList, RenderPosition.BEFOREEND);
      this._renderShowMoreButton();
      this._moreButton.getElement().addEventListener(`click`, () => {
        this._renderFilmsList();
      });
    }
    for (const film of this._filmsToRender.slice(0, this._NUM_RENDER_CARDS)) {
      const moviePresenter = new Movie(this._filmsListContainerElement, this._onFilmChange);
      moviePresenter.init(film);
      this._moviePresenter[film.id] = moviePresenter;
    }
    this._filmsToRender.splice(0, this._NUM_RENDER_CARDS);
    if (this._filmsToRender.length === 0) {
      remove(this._moreButton);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsList.getElement(), this._moreButton, RenderPosition.BEFOREEND);
  }

  _renderFilmsExtraList(title, films) {
    const filmsExtraListComponent = new FilmsExtraList(title);
    const filmsExtraListContainer = filmsExtraListComponent.getElement().querySelector(`.films-list__container`);
    render(this._container, filmsExtraListComponent, RenderPosition.BEFOREEND);
    for (const film of films) {
      const movie = new Movie(filmsExtraListContainer);
      movie.init(film);
    }
  }

  _clearFilmsList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    remove(this._moreButton);
  }

  _onFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._moviePresenter[updatedFilm.id].init(updatedFilm);
  }
}
