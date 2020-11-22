import {createSiteUserRankTemplate} from "./view/user-rank";
import {createSiteMenuTemplate} from "./view/menu";
import {createSiteSortTemplate} from "./view/sort";
import {createSiteFilmsTemplate} from "./view/films";
import {createSiteFilmsListTemplate} from "./view/films-list";
import {createSiteFilmCardTemplate} from "./view/film-card";
import {createSiteMoreButtonTemplate} from "./view/show-more-button";
import {createSiteFilmsExtraTemplate} from "./view/films-extra";
import {createSiteFooterStatisticsTemplate} from "./view/footer-statistics";
import {createSiteDetailsTemplate} from "./view/details";


const NUM_CARDS_OF_FILM = 5;
const NUM_CARDS_OF_EXTRA_FILM = 2;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createSiteUserRankTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSiteSortTemplate(), `beforeend`);
render(siteMainElement, createSiteFilmsTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
render(siteFilmsElement, createSiteFilmsListTemplate(), `beforeend`);

const siteFilmsListContainerElement = siteFilmsElement.querySelector(`.films-list__container`);
for (let i = 0; i < NUM_CARDS_OF_FILM; i++) {
  render(siteFilmsListContainerElement, createSiteFilmCardTemplate(), `beforeend`);
}
render(siteFilmsListContainerElement, createSiteMoreButtonTemplate(), `afterend`);

render(siteFilmsElement, createSiteFilmsExtraTemplate(), `beforeend`);
const siteFilmsListExraElement = siteFilmsElement.querySelector(`.films-list--extra`);
const siteFilmsListExraContainerElement = siteFilmsListExraElement.querySelector(`.films-list__container`);
for (let i = 0; i < NUM_CARDS_OF_EXTRA_FILM; i++) {
  render(siteFilmsListExraContainerElement, createSiteFilmCardTemplate(), `beforeend`);
}

const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteFooterStatisticsElement, createSiteFooterStatisticsTemplate(), `beforeend`);
render(document.body, createSiteDetailsTemplate(), `beforeend`);

const siteDetailsElement = document.querySelector(`.film-details`);
siteDetailsElement.classList.add(`visually-hidden`);
