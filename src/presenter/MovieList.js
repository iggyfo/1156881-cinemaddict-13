
import FilmsList from "../view/films-list";
import FilmCard from "../view/film-card";
import MoreButton from "../view/show-more-button";
import FilmsExtraList from "../view/films-extra";
import Details from "../view/details";
import NoMovies from "../view/no-movies";
import {render, RenderPosition, remove} from "../utils/render";

export default class MovieList {
  constructor(container) {
    this._container = container;
    this._filmsList = new FilmsList();
    this._moreButton = new MoreButton();
    this._filmExtraList = new FilmsExtraList();
    this._noMovie = new NoMovies();


    this._NUM_CARDS_OF_EXTRA_FILM = 2;
    this._NUM_RENDER_CARDS = 5;
    this._ESC = `Escape`;
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
      this._renderFilmsList();
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
      this._renderFilmCard(film);
    }
    this._filmsToRender.splice(0, this._NUM_RENDER_CARDS);
    if (this._filmsToRender.length === 0) {
      remove(this._moreButton);
    }
  }

  _renderFilmCard(film) {
    const showDetails = (film) => {
      const detailsComponent = new Details(film);
      document.body.appendChild(detailsComponent.getElement());
      document.body.classList.add(`hide-overflow`);

      const closeDetails = () => {
        detailsComponent.getElement().remove();
        detailsComponent.removeElement();
        document.body.classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, onDetailsEscKeydown);
      };

      detailsComponent.closeBtnElement.addEventListener(`click`, () => {
        closeDetails();
      });

      const onDetailsEscKeydown = (evt) => {
        if (evt.key === `Escape`) {
          closeDetails();
        }
      };

      document.addEventListener(`keydown`, onDetailsEscKeydown);
    };

    const filmCardComponent = new FilmCard(film);
    filmCardComponent.setClickHandler(showDetails);
    render(this._filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsList.getElement(), this._moreButton, RenderPosition.BEFOREEND);
  }

  _renderFilmsExtraList() {

  }
}
