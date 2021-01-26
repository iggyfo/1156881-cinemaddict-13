import MenuView from "./view/menu";
import FilmsListPresenter from "./presenter/films-list";
import FilterPresenter from "./presenter/filters";
import FooterStatisticsView from "./view/footer-statistics";
import FilmModel from "./model/films";
import FilterModel from "./model/filters";
import {render, RenderPosition} from "./utils/render";
import Api from "./api/api";

const AUTHORIZATION = `Basic jv12n134edvsns`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);


const api = new Api(END_POINT, AUTHORIZATION);

render(headerElement, new MenuView(), RenderPosition.BEFOREEND);

const filtersModel = new FilterModel();
const filmModel = new FilmModel();

api.getFilms().then((films) => {
  filmModel.films = films;
});

// presenters
const filtersPresenter = new FilterPresenter(mainElement, filtersModel, filmModel);
filtersPresenter.init();
const filmsList = new FilmsListPresenter(mainElement, filmModel, filtersModel);
filmsList.init();

// footer
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
// render(footerStatisticsElement, new FooterStatisticsView(filmModel.getFilms.length), RenderPosition.BEFOREEND);


