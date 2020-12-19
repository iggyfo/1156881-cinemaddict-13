import {createUserRankTemplate} from "./view/user-rank";
import {createFilterTemplate} from "./view/filter";
import {createSortTemplate} from "./view/sort";
import {createFilmsTemplate} from "./view/films";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmCardTemplate} from "./view/film-card";
import {createMoreButtonTemplate} from "./view/show-more-button";
import {createFilmsExtraTemplate} from "./view/films-extra";
import {createFooterStatisticsTemplate} from "./view/footer-statistics";
import {createDetailsTemplate} from "./view/details";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";
import {renderTemplate} from "./utils";


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
// const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

renderTemplate(headerElement, createUserRankTemplate(), `beforeend`);
renderTemplate(mainElement, createFilterTemplate(generateFilter(films)), `beforeend`);
renderTemplate(mainElement, createSortTemplate(), `beforeend`);
renderTemplate(mainElement, createFilmsTemplate(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
renderTemplate(filmsElement, createFilmsListTemplate(), `beforeend`);

const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
for (let film of films.slice(0, NUM_RENDER_CARDS)) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`);
}

renderTemplate(filmsListContainerElement, createMoreButtonTemplate(), `afterend`);

const showMoreButtonElement = filmsElement.querySelector(`.films-list__show-more`);
showMoreButtonElement.addEventListener(`click`, () => {
  for (let film of filmsToRender.slice(0, NUM_RENDER_CARDS)) {
    renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`);
  }
  filmsToRender.splice(0, NUM_RENDER_CARDS);
  if (filmsToRender.length === 0) {
    showMoreButtonElement.classList.add(`visually-hidden`);
  }
});

renderTemplate(filmsElement, createFilmsExtraTemplate(), `beforeend`);
const filmsListExraElement = filmsElement.querySelector(`.films-list--extra`);
const filmsListExraContainerElement = filmsListExraElement.querySelector(`.films-list__container`);

for (let film of extraFilms) {
  renderTemplate(filmsListExraContainerElement, createFilmCardTemplate(film), `beforeend`);
}

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
renderTemplate(footerStatisticsElement, createFooterStatisticsTemplate(films.length), `beforeend`);
renderTemplate(document.body, createDetailsTemplate(films[0]), `beforeend`);

const detailsElement = document.querySelector(`.film-details`);
detailsElement.classList.add(`visually-hidden`);

// Временное решение для открытия попапа
filmsListContainerElement.firstElementChild.addEventListener(`click`, () => {
  detailsElement.classList.remove(`visually-hidden`);
});
// Временное решение для закрытия попапа
const detailsCloseButtonElement = detailsElement.querySelector(`.film-details__close-btn`);
detailsCloseButtonElement.addEventListener(`click`, () => {
  detailsElement.classList.add(`visually-hidden`);
});
