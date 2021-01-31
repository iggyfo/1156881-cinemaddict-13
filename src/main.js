import FilmsListPresenter from "./presenter/films-list";
import FilterPresenter from "./presenter/filters";
import FooterStatisticsView from "./view/footer-statistics";
import UserRankView from "./view/user-rank";
import MenuView from "./view/menu";
import FilmModel from "./model/films";
import FilterModel from "./model/filters";
import {render, RenderPosition} from "./utils/render";
import {UpdateType, API_CONFIG} from "./const";
import Api from "./api/api";


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const userRankComponent = new UserRankView();
const menuComponent = new MenuView();

render(headerElement, userRankComponent, RenderPosition.BEFOREEND);
render(mainElement, menuComponent, RenderPosition.AFTERBEGIN);


const api = new Api(API_CONFIG.endPoint, API_CONFIG.authorization);

render(headerElement, new MenuView(), RenderPosition.BEFOREEND);

const filtersModel = new FilterModel();
const filmModel = new FilmModel();

api.getFilms()
  .then((films) => {
    filmModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmModel.setFilms(UpdateType.INIT, []);
  });

// presenters
const filtersPresenter = new FilterPresenter(mainElement, filtersModel, filmModel);
filtersPresenter.init();
const filmsList = new FilmsListPresenter(mainElement, filmModel, filtersModel, api);
filmsList.init();

// footer
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatisticsView(filmModel.films.length), RenderPosition.BEFOREEND);


