import Menu from "./view/menu";
import Filter from "./view/filter";
import Sort from "./view/sort";
import Films from "./view/films";
import FilmsList from "./view/films-list";
import FilmCard from "./view/film-card";
import MoreButton from "./view/show-more-button";
import FilmsExtra from "./view/films-extra";
import FooterStatistics from "./view/footer-statistics";
import Details from "./view/details";
import NoMovies from "./view/no-movies";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";


const NUM_CARDS_OF_EXTRA_FILM = 2;
const NUM_OF_FILMS = 20;
const NUM_RENDER_CARDS = 5;
const ESC = `Escape`;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
let films = [];
let topRatedFilms = [];
let mostCommentedFilms = [];
let filmsToRender = [];

for (let i = 0; i < NUM_OF_FILMS; i++) {
  films.push(generateFilm());
}
topRatedFilms = films.slice(0, NUM_CARDS_OF_EXTRA_FILM);
mostCommentedFilms = films.slice(NUM_CARDS_OF_EXTRA_FILM, NUM_CARDS_OF_EXTRA_FILM + NUM_CARDS_OF_EXTRA_FILM);
filmsToRender = films.slice(NUM_RENDER_CARDS, NUM_OF_FILMS);

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

  const topRated = new FilmsExtra(`Top Rated`);
  render(filmsElement, topRated, RenderPosition.BEFOREEND);

  for (const film of topRatedFilms) {
    const filmCardComponent = new FilmCard(film);
    filmCardComponent.setClickHandler(showDetails);
    render(topRated.getElement().querySelector(`.films-list__container`), filmCardComponent, RenderPosition.BEFOREEND);
  }

  const mostCommented = new FilmsExtra(`Most Commented`);
  render(filmsElement, mostCommented, RenderPosition.BEFOREEND);

  for (const film of mostCommentedFilms) {
    const filmCardComponent = new FilmCard(film);
    filmCardComponent.setClickHandler(showDetails);
    render(mostCommented.getElement().querySelector(`.films-list__container`), filmCardComponent, RenderPosition.BEFOREEND);
  }
}
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);
