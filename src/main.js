import {createUserRankTemplate} from "./view/user-rank";
import {createMenuTemplate} from "./view/menu";
import {createSortTemplate} from "./view/sort";
import {createFilmsTemplate} from "./view/films";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmCardTemplate} from "./view/film-card";
import {createMoreButtonTemplate} from "./view/show-more-button";
import {createFilmsExtraTemplate} from "./view/films-extra";
import {createFooterStatisticsTemplate} from "./view/footer-statistics";
import {createDetailsTemplate} from "./view/details";
import {generateFilm} from "./mock/film";


const NUM_CARDS_OF_EXTRA_FILM = 2;
const NUM_OF_FILMS = 20;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
let films = [];
let extraFilms = [];

for (let i = 0; i < NUM_OF_FILMS; i++) {
  films.push(generateFilm());
}

extraFilms = films.slice(0, NUM_CARDS_OF_EXTRA_FILM);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createUserRankTemplate(), `beforeend`);
render(mainElement, createMenuTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmsTemplate(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, createFilmsListTemplate(), `beforeend`);

const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
for (let film of films) {
  render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`);
}

render(filmsListContainerElement, createMoreButtonTemplate(), `afterend`);

render(filmsElement, createFilmsExtraTemplate(), `beforeend`);
const filmsListExraElement = filmsElement.querySelector(`.films-list--extra`);
const filmsListExraContainerElement = filmsListExraElement.querySelector(`.films-list__container`);

for (let film of extraFilms) {
  render(filmsListExraContainerElement, createFilmCardTemplate(film), `beforeend`);
}

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, createFooterStatisticsTemplate(), `beforeend`);
render(document.body, createDetailsTemplate(films[1]), `beforeend`);

const detailsElement = document.querySelector(`.film-details`);
// detailsElement.classList.add(`visually-hidden`);
