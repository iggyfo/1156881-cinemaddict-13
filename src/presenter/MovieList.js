import Menu from "./view/menu";
import Filter from "./view/filter";
import Sort from "./view/sort";
import Films from "./view/films";
import FilmsList from "./view/films-list";
import FilmCard from "./view/film-card";
import MoreButton from "./view/show-more-button";
import FilmsExtraList from "./view/films-extra";
import FooterStatistics from "./view/footer-statistics";
import Details from "./view/details";
import NoMovies from "./view/no-movies";
import {render, RenderPosition} from "./utils/render";

export default class MovieList {
  constructor(filmContainer) { // mainElement
    this._filmsContainer = filmContainer;
    this._filmsList = new FilmsList();
    this._NUM_CARDS_OF_EXTRA_FILM = 2;
    this._NUM_RENDER_CARDS = 5;
    this._ESC = `Escape`;
    this._extraFilms = [];
    this._filmsToRender = [];
  }

  init(films) {
    this._extraFilms = films.slice(0, this._NUM_CARDS_OF_EXTRA_FILM);
    this._filmsToRender = films.slice(this._NUM_RENDER_CARDS, this._NUM_OF_FILMS);
  }

  _renderFilter() {

  }

  _renderNoMovies() {

  }

  _renderSort() {

  }

  _renderFilmsContainer() {

  }

  _renderFilmsList() {

  }

  _renderFilmCard() {

  }

  _renderShowMoreButton() {

  }

  _renderShowMoreButton() {

  }


}



const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

// for (let i = 0; i < NUM_OF_FILMS; i++) {
//   films.push(generateFilm());
// }


render(headerElement, new Menu(), RenderPosition.BEFOREEND);
render(mainElement, new Filter(generateFilter(films)), RenderPosition.BEFOREEND);
if (films.length === 0) {
  render(mainElement, new NoMovies(), RenderPosition.BEFOREEND);
} else {
  render(mainElement, new Sort(), RenderPosition.BEFOREEND);
  render(mainElement, new Films(), RenderPosition.BEFOREEND);
  const filmsElement = mainElement.querySelector(`.films`);
  render(filmsElement, new FilmsList(), RenderPosition.BEFOREEND);

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
      if (evt.key === ESC) {
        closeDetails();
      }
    };

    document.addEventListener(`keydown`, onDetailsEscKeydown);
  };

  const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
  for (const film of films.slice(0, NUM_RENDER_CARDS)) {
    const filmCardComponent = new FilmCard(film);
    filmCardComponent.setClickHandler(showDetails);
    render(filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

  const filmsListElement = document.querySelector(`.films-list`);
  render(filmsListElement, new MoreButton(), RenderPosition.BEFOREEND);

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
}
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);