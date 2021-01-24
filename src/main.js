import MenuView from "./view/menu";
import FilmsListPresenter from "./presenter/films-list";
import FilterPresenter from "./presenter/filters";
import FooterStatisticsView from "./view/footer-statistics";
import FilmModel from "./model/films";
import FilterModel from "./model/filters";
import {generateFilm} from "./mock/film";
import {render, RenderPosition} from "./utils/render";


const NUM_OF_FILMS = 20;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
let films = [];

for (let i = 0; i < NUM_OF_FILMS; i++) {
  films.push(generateFilm());
}
render(headerElement, new MenuView(), RenderPosition.BEFOREEND);

const filtersModel = new FilterModel();
const filmModel = new FilmModel();
filmModel.films = films;

// presenters
const filtersPresenter = new FilterPresenter(mainElement, filtersModel, filmModel);
filtersPresenter.init();
const filmsList = new FilmsListPresenter(mainElement, filmModel, filtersModel);
filmsList.init(films);

// footer
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);
