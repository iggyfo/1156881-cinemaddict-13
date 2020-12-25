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
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";
import {render, RenderPosition} from "./utils";


const NUM_CARDS_OF_EXTRA_FILM = 2;
const NUM_OF_FILMS = 20;
const NUM_RENDER_CARDS = 5;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
let films = [];
let extraFilms = [];
let filmsToRender = [];

for (let i = 0; i < NUM_OF_FILMS; i++) {
  films.push(generateFilm());
}
extraFilms = films.slice(0, NUM_CARDS_OF_EXTRA_FILM);
filmsToRender = films.slice(NUM_RENDER_CARDS, NUM_OF_FILMS);

render(headerElement, new Menu().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Filter(generateFilter(films)).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Films().getElement(), RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, new FilmsList().getElement(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
for (let film of films.slice(0, NUM_RENDER_CARDS)) {
  const filmCardComponent = new FilmCard(film);
  filmCardComponent.getElement().addEventListener(`click`, () => {
    const detailsComponent = new Details(film);
    document.body.appendChild(detailsComponent.getElement());
    document.body.classList.add(`hide-overflow`);
    detailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      document.body.removeChild(detailsComponent.getElement());
      document.body.classList.remove(`hide-overflow`);
    });
  });
  filmCardComponent.getElement().querySelector(`.film-details__close-btn`);
  render(filmsListContainerElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
}

const filmsListElement = document.querySelector(`.films-list`);
render(filmsListElement, new MoreButton().getElement(), RenderPosition.BEFOREEND);

const showMoreButtonElement = filmsElement.querySelector(`.films-list__show-more`);
showMoreButtonElement.addEventListener(`click`, () => {
  for (let film of filmsToRender.slice(0, NUM_RENDER_CARDS)) {
    render(filmsListContainerElement, new FilmCard(film).getElement(), RenderPosition.BEFOREEND);
  }
  filmsToRender.splice(0, NUM_RENDER_CARDS);
  if (filmsToRender.length === 0) {
    showMoreButtonElement.classList.add(`visually-hidden`);
  }
});

render(filmsElement, new FilmsExtra().getElement(), RenderPosition.BEFOREEND);
const filmsListExraElement = filmsElement.querySelector(`.films-list--extra`);
const filmsListExraContainerElement = filmsListExraElement.querySelector(`.films-list__container`);

for (let film of extraFilms) {
  render(filmsListExraContainerElement, new FilmCard(film).getElement(), RenderPosition.BEFOREEND);
}

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
// render(document.body, new Details(films[0]).getElement(), RenderPosition.BEFOREEND);

// const detailsElement = document.querySelector(`.film-details`);
// detailsElement.classList.add(`visually-hidden`);

// Временное решение для открытия попапа
// filmsListContainerElement.firstElementChild.addEventListener(`click`, () => {
//   detailsElement.classList.remove(`visually-hidden`);
// });
// // Временное решение для закрытия попапа
// const detailsCloseButtonElement = detailsElement.querySelector(`.film-details__close-btn`);
// detailsCloseButtonElement.addEventListener(`click`, () => {
//   detailsElement.classList.add(`visually-hidden`);
// });
