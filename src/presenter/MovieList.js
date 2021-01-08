
import FilmsList from "../view/films-list";
import FilmCard from "../view/film-card";
import MoreButton from "../view/show-more-button";
import FilmsExtraList from "../view/films-extra";
import FooterStatistics from "../view/footer-statistics";
import Details from "../view/details";
import NoMovies from "../view/no-movies";
import {render, RenderPosition} from "../utils/render";

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
      this._topRatedFilms = films.slice(0, this._NUM_CARDS_OF_EXTRA_FILM);
      this._mostCommentedFilms = films.slice(this._NUM_CARDS_OF_EXTRA_FILM, this._NUM_CARDS_OF_EXTRA_FILM + this._NUM_CARDS_OF_EXTRA_FILM);
      this._filmsToRender = films.slice(this._NUM_RENDER_CARDS, this._NUM_OF_FILMS);
      this._renderFilmsContainer();
      this._filmsElement = this._filmsList.getElement().querySelector(`.films`);
      this._filmsListElement = this._filmsList.getElement().querySelector(`.films-list`);
      this._filmsListContainerElement = this._filmsList.getElement().querySelector(`.films-list__container`);
      this._showMoreButtonElement = this._moreButton.getElement().querySelector(`.films-list__show-more`);
    }
  }

  _renderNoMovies() {
    render(this._container, this._noMovie, RenderPosition.BEFOREEND);
  }

  _renderFilmsContainer() {
    render(this._container, this._filmsContainer, RenderPosition.BEFOREEND);
    this._renderFilmsList();

  }

  _renderFilmsList() {
    render(this._filmElement, this._filmsList, RenderPosition.BEFOREEND);
    for (const film of this._films.slice(0, this._NUM_RENDER_CARDS)) {
      this._renderFilmCard(film);
    }
    this._renderShowMoreButton();
  }

  _renderFilmCard(film) {
    const filmCardComponent = new FilmCard(film);
    // filmCardComponent.setClickHandler(showDetails);
    render(this._filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsListElement, new MoreButton(), RenderPosition.BEFOREEND);
    this._showMoreButtonElement.addEventListener(`click`, () => {)
  }

  _renderFilmsExtraList() {

  }
}




const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, new FilmsList(), RenderPosition.BEFOREEND);

// const showDetails = (film) => {
//   const detailsComponent = new Details(film);
//   document.body.appendChild(detailsComponent.getElement());
//   document.body.classList.add(`hide-overflow`);

//   const closeDetails = () => {
//     detailsComponent.getElement().remove();
//     detailsComponent.removeElement();
//     document.body.classList.remove(`hide-overflow`);
//     document.removeEventListener(`keydown`, onDetailsEscKeydown);
//   };

//   detailsComponent.closeBtnElement.addEventListener(`click`, () => {
//     closeDetails();
//   });

//   const onDetailsEscKeydown = (evt) => {
//     if (evt.key === ESC) {
//       closeDetails();
//     }
//   };

//   document.addEventListener(`keydown`, onDetailsEscKeydown);
// };





const showMoreButtonElement = filmsElement.querySelector(`.films-list__show-more`);
showMoreButtonElement.addEventListener(`click`, () => {
  for (const film of filmsToRender.slice(0, NUM_RENDER_CARDS)) {
    const filmCardComponent = new FilmCard(film);
    filmCardComponent.setClickHandler(showDetails);
    render(filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }
  filmsToRender.splice(0, NUM_RENDER_CARDS);
  if (filmsToRender.length === 0) {
    showMoreButtonElement.classList.add(`visually-hidden`);
  }
});

render(filmsElement, new FilmsExtraList(), RenderPosition.BEFOREEND);
const filmsListExraElement = filmsElement.querySelector(`.films-list--extra`);
const filmsListExraContainerElement = filmsListExraElement.querySelector(`.films-list__container`);

for (const film of extraFilms) {
  const filmCardComponent = new FilmCard(film);
  filmCardComponent.setClickHandler(showDetails);
  render(filmsListExraContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
}

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);
